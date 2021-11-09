/**
 * Auther : Abilash TS 
 * Github : https://github.com/Abilash-Abi
 */

jQuery.fn.extend({
    searchable:function(data,selected=[],options=[],){
        let input_id = this[0].id;
        this.addClass('d-none');
        if($('#'+input_id+'_label').length === 0){
            this.after('<label for="form-control" id="'+input_id+'_label" class="ss-chip form-control searchable-modal selected-chips"></label>');
        }
        let searchable = new SearchableCheckbox(data,selected,options,this);
        let html = searchable.renderModal();
        if($('#'+input_id+'_model').length > 0){
            $('#'+input_id+'_model').html(html);
        }else {
            $(document.body).append('<div id="'+input_id+'_model">'+html+'</div>');
        }
        
      
        $(document).on('click','#'+input_id+'_label',function(){
            $('#'+input_id+'_model').children().modal('show');
        });
    }
})
class SearchableCheckbox{
    constructor(data = [],selected=[],options=[],element){
console.log(data);
        this.element = element;
         this.input_id = element[0].id;

        this.data =  data;
        this.allData = JSON.parse(JSON.stringify(data));
        this.selected = selected.length > 0 ? selected.map(id=>parseInt(id)) : [];
        this.options =  options;

        this.modelId =  this.input_id+'_search_modal';
        this.type = options.type !=undefined ? options.type : 'checkbox';
        this.parents =  data.filter(item=>{return typeof item.childs!=undefined && item.childs.length > 0});
        if(selected.length > 0 ){
            this.success();
        }
        this.html = '';
    }


    renderModal(){
        this.renderModalHeader();
        this.html +='<div class=modal-body>';
        if(this.options.chip !=undefined && !this.options.chip){

        }else {
            this.html += renderChips(this.parents,this.input_id);
        }
        this.html += '<div id="searchable-modal-content">';
        this.renderContents(this.data);
        this.html +='</div></div></div>';

        this.renderModalFooter();
        this.addEventListener();
        return this.html;        
    }


    renderContents(data,level=0){
        let count = data.length;
        let marginLeft = eval(level)*3; 
       
        let style = '';    
        if(marginLeft > 0){
             style = 'style="margin-left:'+marginLeft+'px"';    
        }
        if(data.length > 0){
            for(let index =0; index<count; index++){
                let item = data[index];
                if(item.childs.length > 0){
                if(index!=0) this.html +='</div>';
                    this.html +='<div class="row" '+style+'><div class=col-md-4><h6 class=checkbox-title>'+item.name+'<h6></div></div>';
                    let nextLevel = level+1;                
                    this.renderContents(item.childs,nextLevel);
                if(level!=0) {this.html +='</div><div class="row" '+style+'>'; };                
                }else {        
                if(index==0) {this.html +='<div class="row" '+style+'>'; };
                    let selectedCheckBox = this.selected.indexOf(item.id) > -1 ? true :false;
                    this.html +=this.options.renderCheckbox !=undefined ? this.options.renderCheckbox(item,selectedCheckBox,'input-searchable-checkbox_'+this.input_id,'searchable_checkbox_'+this.input_id) : renderCheckbox(item,selectedCheckBox,this.type,this.input_id);
                }
            }  
        }else {
            this.html += '<h6>No records found</h6><div>';
        }
    }


    renderModalHeader(){
        this.html = '<div class="fade modal"aria-hidden=true aria-labelledby=searchable-checkbox data-bs-backdrop=static data-bs-keyboard=false id='+this.modelId+' tabindex=-1><div class="modal-dialog modal-dialog-top modal-dialog-scrollable modal-lg"><div class=modal-content>';
        this.renderModalHeaderContent();
    }

    renderModalHeaderContent(){
        this.html += '<div class=modal-header>';
        if(this.options.renderHeader !=undefined){
            this.html += this.options.renderHeader('searchable-input_'+this.input_id);
        }else {
            this.html += '<div class="search-modal-header"><input type="text" id=searchable-input_'+this.input_id+' class="form-control search-checkbox" placeholder=Search...></div>';
        }
        this.html += '</div>';
    }


    renderModalFooter(){
        this.html +='<div class=modal-footer>';
        this.html += this.options.renderFooter!=undefined ? this.options.renderFooter('searchable-modal-btn-close','searchable-modal-btn-done_'+this.input_id) : '<button class="btn btn-primary" id=searchable-modal-btn-done_'+this.input_id+' type=button >Done</button>';
        this.html += '</div>';
    }
   
    addEventListener(){
        let thisVal = this;

        $(document).on('click','.badge_'+this.input_id,function(){
            let id = $(this).attr('val');
            $('.badge_'+thisVal.input_id).removeClass('bg-success');
            $(this).addClass('bg-success');
            thisVal.filterCat(id);
        }); 

        $(document).on('click','.search-radio-button_'+this.input_id,function(){
            let id = $(this).attr('val');
            $('.search-radio-button_'+thisVal.input_id).removeClass("search-radio-selected");
            $(this).addClass("search-radio-selected");
            thisVal.selected =[parseInt(id)];
           thisVal.success();

           $('#'+thisVal.modelId).modal('hide');

            
        }); 

        $(document).on('keyup','#searchable-input_'+this.input_id,function(){
            let text = $(this).val();
            thisVal.searchCategory(text);
        }); 

        $(document).on('click','.input-searchable-checkbox_'+this.input_id,function(){
            let  checked = $(this).is(':checked');
            let value = parseInt($(this).val());
       
            if(checked){
                thisVal.addToSelect(value);
            }else {
                thisVal.removeSelect(value);
            }
        });     
        
        
        $(document).on('click','#searchable-modal-btn-done_'+this.input_id,function(){
           thisVal.success();
            $('#'+thisVal.modelId).modal('hide');
        });
    }

    success(){
        let badges = this.getSelectedAsChips(this.allData);
        this.element.val(this.selected);
        this.element.next().html(badges);
        $('#'+this.input_id).change();
    }

    getSelectedAsChips(data){
        let selected = this.selected;
        let badges ='';
            data.map(item=>{
            if(selected.includes(item.id)){
                badges += '<span class="badge bg-secondary selected-chips me-2">'+item.name+'</span>';
            }
            if(item.childs.length > 0){
                badges += this.getSelectedAsChips(item.childs);
            }
        });
        return badges;
    }
    removeSelect(id){
        this.html='';
        let remaining = this.selected.filter(item=>item!=id);
        this.selected = remaining;
        this.renderContents(this.data);
    }
    addToSelect(id){
        this.html='';
        this.selected.push(id);
    }

    searchCategory(text){
        this.html='';
        if(text==""){            
            let id = $('.bg-success').attr('val');
            id = id != undefined ? id : 0;
            this.filterCat(id);
        }else {
        let newData = JSON.parse(JSON.stringify(this.data));
        this.renderContents(this.getData(newData,text));
        document.getElementById('searchable-modal-content').innerHTML = this.html; 
    }
       
    }

    getData(data,text){
       return  data.filter(item=>{
            let name = item.name.toLowerCase();
            if(name.search(text) > -1){
                return true;
            }else{
                if(item.childs.length > 0){
                   let value = this.getData(item.childs,text);
                   if(value.length > 0){
                       item.childs =  value;
                       return true;
                   }
                }
                return false;
            }
        });
    }

    filterCat(id){
        this.html='';
        let newArray = id==0 ? this.allData : this.allData.filter(item=>{return item.id ==id});
        this.data =  JSON.parse(JSON.stringify(newArray));
        this.renderContents(this.data);
        document.getElementById('searchable-modal-content').innerHTML = this.html;        
    }
}

const renderCheckbox = (item,selected,type,input_id)=>{
    
    if(type==='radio'){
    let checked = selected ? 'search-radio-selected' : '';

        return '<div class=col-md-4><button type="button" class="btn btn-outline-primary mb-2 btn-sm search-radio-button search-radio-button_'+input_id+' '+checked+'" val="'+item.id+'">'+item.name+'</button></div>';
    }
    let checked = selected ? 'checked' : '';
  return '<div class=col-md-4><div class=form-check><input '+checked+' class="form-check-input input-searchable-checkbox_'+input_id+'" id=searchable_checkbox_'+input_id+'_'+item.id+' value="'+item.id+'" type=checkbox> <label class=form-check-label for=searchable_checkbox'+item.id+'>'+item.name+'</label></div></div>';
}


const renderChips = (parents,input_id)=>{
        let tags = '<div class=tag-wraper>';
        tags += '<span class="badge badge-pill bg-primary item-badge badge_'+input_id+' bg-success" val="0">All</span>';

        if(parents.length > 0){
            parents.map(item=>{
                tags += '<span class="badge badge-pill bg-primary item-badge badge_'+input_id+'"   val="'+item.id+'">'+item.name+'</span>';
            })
        }
         tags += '</div>';
        return tags
}





$(document).on('click','#searchable-modal-btn-close',function(){
    $('#searchableModal').modal('hide');
  });

