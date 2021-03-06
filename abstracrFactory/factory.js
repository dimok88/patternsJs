//Factory
(function(win, doc){
    function RedCircle(){};
    RedCircle.prototype.create = function(){
        this.item = doc.createElement("div");
        this.item.className = "circle";
        return this;
    }
    
    function BlueCircle(){};
    BlueCircle.prototype.create = function(){
        this.item = doc.createElement("div");
        this.item.style.background = "blue";
        this.item.className = "circle";
        
        return this;
    }
    
    //factory
    var CircleFactory = function(){
        this.types = {};
        this.create = function(type){
            return new this.types[type].create();
        }
        
        this.register = function(type, cls){
            if(cls.prototype.create){
                this.types[type] = cls;
            }
        }
    };
    
    
    //singleton
    var CircleSingleton = (function(){
       var instance;
       
       function init(){
           var _circle = [];
           var _stage = doc.querySelector(".adv");
           var _cf = new CircleFactory();
           _cf.register("red", RedCircle);
           _cf.register("blue", BlueCircle);
           
           function _position(circle, left, top){
               circle.style.left = left+"px";
               circle.style.top = top+"px";
           }
           
           function create(left,top, color){
               var circle = _cf.create(color).item;
               _position(circle, left, top);
               
               return circle;
           }
           
           function add(circle){
               _stage.append(circle);
               _circle.push(circle);
           }
           
           function index(){
               return _circle.length;
           }
           
           return {
               index,
               create,
               add
           };
       }
       
       return {
         getInstance: function(){
             if(!instance){
                 instance = init();
             }
             
             return instance;
         }
       };
    })();
    
    doc.addEventListener("DOMContentLoaded", function(){
        var stage = doc.querySelector(".adv");
        stage.addEventListener("click", function(e){
           var cg = CircleSingleton.getInstance();
           var circle = cg.create(e.pageX-25, e.pageY-25, Math.random()>.5 ? "red" : 'blue');
           cg.add(circle);
        });
    });
    
})(window,document);