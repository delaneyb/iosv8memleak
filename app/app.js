const { Application } = require("@nativescript/core");
/*
Using global dispatch control also still causes memory leak
1. const currQueue = dispatch_get_current_queue()
2. dispatch_async(currQueue, resolve.bind(this, value))
*/

global.testObject = {
    prop: {
        nestedProp: 'value',
        another: 1,
        third: 3
    }
}

Application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
