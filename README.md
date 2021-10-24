# js-multilevel-searchable-checkbox
###### Demo

Usage
```javascript
new SearchableCheckbox(data,selected,options)
#data = Data to the searchable modal
eg :[
	{
		name:"Beauty & Toys",
		id:1,
		childs:[]
	}
]

#selected - selected checkbox ids, eg [1,2]
#options - SearchableCheckbox configuration properties

```

```html
<html>
<head>
    <link rel="stylesheet" href="./lib//searchable-checkbox.css" />
</head>
<body>
    <div id="searchable-modal"></div>
   <button type="button" class="btn btn-primary searchable-modal">
            Open
        </button>
</body>
<script src="./lib/searchable-checkbox.js"></script>
<script>
    new SearchableCheckbox(data,[],
        {
            success: (res) => {
                $('#selecetd_ids').html(res.join(','));
            },
        }
    );
	</script>
</html>
```
####Advanced Setup
```javascript
new SearchableCheckbox(data, [],
        {
            chip:true,
            success: (res) => {
                $('#selecetd_ids').html(res.join(','));
            },

            renderFooter:(closeBtnId,doneBtnId)=>{
                return '<button id="'+doneBtnId+'">Done</button>';
            },
            renderCheckbox:(item,selected,className)=>{
                let checked = selected ? 'checked' : '';
                return '<input type="checkbox" '+checked+' value="'+item.id+'" class="'+className+'">'+item.name;
            },
            renderHeader:(searchInputId)=>{
                return '<h3>Categories<h3><input type="text" id="'+searchInputId+'" placeholder="Search Category    "/>';
            }
        }
    );
```

#### Props
