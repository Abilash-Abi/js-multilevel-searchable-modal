# js-multilevel-searchable-modal
####  Multiple
[![https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/checkbox.png](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/checkbox.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/checkbox.png")](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/checkbox.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/checkbox.png")
[![https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/selected-checkbox.png](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/selected-checkbox.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/selected-checkbox.png")](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/selected-checkbox.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/selected-checkbox.png")

##### Single

[![https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/single-select.png](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/single-select.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/single-select.png")](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/single-select.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/single-select.png")

[![https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/singleselected.png](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/singleselected.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/singleselected.png")](https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/singleselected.png "https://github.com/Abilash-Abi/js-multilevel-searchable-modal/blob/2022e08549a31b381b4488b378512ba83adb7f92/demo/singleselected.png")
#### Installation
Download or clone this repo and run index.html

#### Usage
```javascript

let data = [
	{
		name:"Beauty & Toys",
		id:1,
		childs:[]
	}
]
$('#searchable').searchable(data,[]);
#selected - selected checkbox ids, eg [1,2]
#options - SearchableCheckbox configuration properties

```

```html
<html>
<head>
    <link rel="stylesheet" href="./lib//searchable-checkbox.css" />
</head>
<body>
          <input type="text" id="searchable" class="input-field" />
</body>
<script src="./lib/searchable-checkbox.js"></script>
<script>
       $('#searchable').searchable(data,[]);

	</script>
</html>
```

#### Advanced Setup

```javascript
 $('#searchable').searchable(data,[],{
        chip:false,
        renderFooter:(closeBtnId,doneBtnId)=>{return '<button id="'+doneBtnId+'">Done</button>'},
                  renderCheckbox:(item,selected,className,id)=>{
                let checked = selected ? 'checked' : '';
                return '<input id='+id+' type="checkbox" '+checked+' value="'+item.id+'" class="'+className+'">'+item.name;
            },

            renderHeader:(searchInputId)=>{
                return '<h3>Categories<h3><input type="text" id="'+searchInputId+'" placeholder="Search Category    "/>';
            }
    });
```

#### Options
| Name  | Type   | Default   | Note   |
| ------------ | ------------ | ------------ | ------------ |
|   chip|  bool | true  | If set false, then parent chip will not show   |
|   type|  string | checkbox  | Pass 'radio' for single select   |
| renderFooter(closeBtnId,doneBtnId)  |  Function |  default |  Enable you to render custom footer for modal |
|  renderCheckbox(item,selected,className) | Function  | default   |  Enable you to render custom checkbox and logic | 
|  renderHeader(searchInputId) | Function  | default   |  Custom header for modal with search input feature | |


