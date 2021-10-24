# js-multilevel-searchable-checkbox
###### Demo
[![https://raw.githubusercontent.com/Abilash-Abi/js-multilevel-searchable-checkbox/master/demo/img.PNG?token=AKH3QPRIVKUZQ5ISAG47UF3BOWFFM](https://raw.githubusercontent.com/Abilash-Abi/js-multilevel-searchable-checkbox/master/demo/img.PNG?token=AKH3QPRIVKUZQ5ISAG47UF3BOWFFM "https://raw.githubusercontent.com/Abilash-Abi/js-multilevel-searchable-checkbox/master/demo/img.PNG?token=AKH3QPRIVKUZQ5ISAG47UF3BOWFFM")](http://https://raw.githubusercontent.com/Abilash-Abi/js-multilevel-searchable-checkbox/master/demo/img.PNG?token=AKH3QPRIVKUZQ5ISAG47UF3BOWFFM "https://raw.githubusercontent.com/Abilash-Abi/js-multilevel-searchable-checkbox/master/demo/img.PNG?token=AKH3QPRIVKUZQ5ISAG47UF3BOWFFM")

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

#### Advanced Setup

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

#### Options
| Name  | Type   | Default   | Note   |
| ------------ | ------------ | ------------ | ------------ |
|   chip|  bool | true  | If set false, then parent chip will not show   |
| success(res)  |  Function |  () => {} | Called when click on the done button |
| renderFooter(closeBtnId,doneBtnId)  |  Function |  default |  Enable you to render custom footer for modal |
|  renderCheckbox(item,selected,className) | Function  | default   |  Enable you to render custom checkbox and logic | 
|  renderHeader(searchInputId) | Function  | default   |  Custom header for modal with search input feature | |


