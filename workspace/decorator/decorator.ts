


function courseProperty(target: any){
  Object.defineProperty(target.prototype, 'course', {value: "CSCIE31"});
}

@courseProperty
class myClass{
  doSomething(){
    console.log("i am doing something");
  }
}

let c = new myClass();

c.doSomething();
console.log(c.course);
