const Observable = require("@nativescript/core").Observable;

function getMessage(loopRunning) {
    return `loopRunning: ${loopRunning}`
}

let intervalTimerId, count = 0

// Log the amount of times CFRunLoopPerformBlock has been called so we can compare against number of
// persisting memory allocations in instruments
setInterval(() => {
    console.log(count);
}, 1000);

function createViewModel() {
    const viewModel = new Observable();
    viewModel.runningLoop = false;
    viewModel.message = getMessage(viewModel.runningLoop);
    
    viewModel.onTap = () => {
        viewModel.runningLoop = !viewModel.runningLoop;
        viewModel.set("message", getMessage(viewModel.runningLoop));
        if (viewModel.runningLoop) {
            intervalTimerId = setInterval(() => {
                for (var i = 0; i < 300; i++) {
                    viewModel.performBlockOnce()
                }
            }, 100);
        } else {
            clearInterval(intervalTimerId)
        }
    };
    
    viewModel.performBlockOnce = () => {
        let runloop = CFRunLoopGetCurrent();
        CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, () => {  });
        CFRunLoopWakeUp(runloop);
        ++count
    };
    
    return viewModel;
}

exports.createViewModel = createViewModel;
