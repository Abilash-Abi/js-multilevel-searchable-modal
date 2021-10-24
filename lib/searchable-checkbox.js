/**
 * Auther : Abilash TS 
 * Github : https://github.com/Abilash-Abi
 */
class SearchableCheckbox{
    constructor(data = [],selected=[],options=[]){
        this.data =  data;
        this.allData = JSON.parse(JSON.stringify(data));
        this.selected = selected;
        this.options =  options;
        this.parents =  data.filter(item=>{return item.childs.length > 0});

        this.html = '';
        this.renderModal();
    }


    renderModal(){
        this.renderModalHeader();
        this.html +='<div class=modal-body>';
        if(this.options.chip !=undefined && !this.options.chip){

        }else {
            this.html += renderChips(this.parents);
        }
        this.html += '<div id="searchable-modal-content">';
        this.renderContents(this.data);
        this.html +='</div></div>';

        this.renderModalFooter();

        this.addEventListener();
        document.getElementById('searchable-modal').innerHTML = this.html;        
    }


    renderContents(data,level=0){
        let count = data.length;
        let marginLeft = eval(level)*3; 
       
        let style = '';    
        if(marginLeft > 0){
             style = 'style="margin-left:'+marginLeft+'px"';    
        }
        
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
                this.html +=this.options.renderCheckbox !=undefined ? this.options.renderCheckbox(item,selectedCheckBox,'input-searchable-checkbox') : renderCheckbox(item,selectedCheckBox);
            }
        }  
    }


    renderModalHeader(){
        this.html = '<div class="fade modal"aria-hidden=true aria-labelledby=searchable-checkbox data-bs-backdrop=static data-bs-keyboard=false id=searchableModal tabindex=-1><div class="modal-dialog modal-dialog-top modal-dialog-scrollable modal-lg"><div class=modal-content>';
        this.renderModalHeaderContent();
    }

    renderModalHeaderContent(){
        this.html += '<div class=modal-header>';
        if(this.options.renderHeader !=undefined){
            this.html += this.options.renderHeader('searchable-input');
        }else {
            this.html += '<div class="search-modal-header"><input id=searchable-input class=search-checkbox placeholder=Search></div>';
        }
        this.html += '</div>';
    }


    renderModalFooter(){
        this.html +='<div class=modal-footer>';
        this.html += this.options.renderFooter!=undefined ? this.options.renderFooter('searchable-modal-btn-close','searchable-modal-btn-done') : '<button class="btn btn-danger"type=button data-bs-dismiss=modal  id=searchable-modal-btn-close>Close</button> <button class="btn btn-primary"type=button id=searchable-modal-btn-done>Done</button>';
        this.html += '</div>';
    }
   
    addEventListener(){
        let thisVal = this;

        $(document).on('click','.item-badge',function(){
            let id = $(this).attr('val');
            $('.item-badge').removeClass('badge-selected');
            $(this).addClass('badge-selected');
            thisVal.filterCat(id);
        }); 
        

        $(document).on('keyup','#searchable-input',function(){
            let text = $(this).val();
            thisVal.searchCategory(text);
        }); 

        $(document).on('click','.input-searchable-checkbox',function(){
            let  checked = $(this).is(':checked');
            let value = parseInt($(this).val());
       
            if(checked){
                thisVal.addToSelect(value);
            }else {
                thisVal.removeSelect(value);
            }
        });     
        
        
        $(document).on('click','#searchable-modal-btn-done',function(){
           thisVal.success();
            $('#searchableModal').modal('hide');
        });
    }

    success(){
        this.options.success(this.selected);
        console.log(this.selected);
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
            let id = $('.badge-selected').attr('val');
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

const renderCheckbox = (item,selected)=>{
    let checked = selected ? 'checked' : '';
  return '<div class=col-md-4><div class=form-check><input class="input-searchable-checkbox" '+checked+' value="'+item.id+'" id=searchable_checkbox'+item.id+' type=checkbox> <label class=searchable-check-box-label for=searchable_checkbox'+item.id+'>'+item.name+'</label></div></div>';
}


const renderChips = (parents)=>{
        let tags = '<div class=tag-wraper>';
        tags += '<span class="badge badge-pill badge-primary item-badge badge-selected" val="0">All</span>';

        if(parents.length > 0){
            parents.map(item=>{
                tags += '<span class="badge badge-pill badge-primary item-badge"   val="'+item.id+'">'+item.name+'</span>';
            })
        }
         tags += '</div>';
        return tags
}



$('.searchable-modal').on('click',function(){
  $('#searchableModal').modal('show');
});

$(document).on('click','#searchable-modal-btn-close',function(){
    $('#searchableModal').modal('hide');
  });

