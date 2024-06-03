### Build

Build for dev:
`ng build --watch`

implement: 
`"@ferdinond/web-editor": "file:../web-editor/dist/web-editor"`

Build for Prod:
`ng build`

Build and publish: `./build.sh`



## Use Service

Import and Use the Service

```
  import { WebEditorService} from "@ferdinond/web-editor";

  @Component({
      ...
  })
  export class YourComponent{
  
    constructor(private myLibService: WebEditorService) {}
    
    user(){
          let data = this.myLibService.getTextData()
    }
    
  }
```
