//////////////////////////////////////////////////////////////////////////
//
// Создание виртулалных драйверов для взаимодействия с Wevo
//
//  Модуль тёплых полов  для термоголовки нормально открытой
//
////////////////////////////////////////////////////////////////////////////////////



// Переменные 


var _fh_namber="Room1";
var _fh_condition="wb-w1/28-00000e7ef738";   // Текущее состояние  температуры
var _fh_frequency=10000;   // частота в мс.
var _fh_delta=1;         // Delta
var _fh_rele="wb-mr6c_48/K2";
var timer_id_fh1 
var _fh_HF_UP="floor_heating2/temp_up";
var _fh_HF_DN="floor_heating2/temp_dn";
//

var _fh_set = "floor_heating2/temp";      // Название и порядковый номер модуля !!! не должны повторяться в рамках одного прибора !!!   Уставка
var _fh_ON_OFF="floor_heating2/switch";   // Название и порядковый номер модуля !!! не должны повторяться в рамках одного прибора !!!   Включение / Выключение 


defineVirtualDevice("floor_heating2",  {
  
  title: "Отопление в гостиной",
 	cells: {
    
      switch: {
        title: "ON/OFF",
		   type: "switch",
		  value: false

        },// switch
    
        config: {
        title: "config",
		   type: "switch",
		  value: false

        },// switch
    
      temp: {
        title: "Уставка температуры",
		type: "range",
	    value: 24,
        max: 32,
        min: 18

        },// range
      temp_up: {
        title: "ON/OFF",
		   type: "switch",
		  value: false
        },// switch
    temp_dn: {
        title: "ON/OFF",
		   type: "switch",
		  value: false
        },// switch

        }  // calls  
});    //      floor_heating1




  defineRule({
    whenChanged: _fh_HF_UP,
   then: function (newValue, devName, cellName) {
        log ("Увеличиваем уставку  тёплых полов в {} , Температура  = {}, Уставка = {}  , timer_id_fh1 {} ",_fh_namber,dev[_fh_condition], dev[_fh_set], timer_id_fh1 );
        if (dev[_fh_set] > 31 ) {
           dev[_fh_set]=32; 
             }
        else {
          dev[_fh_set]=dev[_fh_set]+1;
        }
      }
        });
  

  defineRule({
    whenChanged: _fh_HF_DN,
   then: function (newValue, devName, cellName) {
              log ("Увеличиваем уставку  тёплых полов в {} , Температура  = {}, Уставка = {}  , timer_id_fh1 {} ",_fh_namber,dev[_fh_condition], dev[_fh_set], timer_id_fh1 );
        if (dev[_fh_set] < 19 ) {
           dev[_fh_set]=18; 
          }
        else {
          dev[_fh_set]=dev[_fh_set]-1;
        }
   }   
   });
  

  defineRule({
    whenChanged: _fh_ON_OFF,
   then: function (newValue, devName, cellName) {
      if (newValue) {
        log ("Включаем модуль тёплых полов в {} , Температура  = {}, Уставка = {}  , timer_id_fh1 {} ",_fh_namber,dev[_fh_condition], dev[_fh_set], timer_id_fh1 );
        
       timer_id_fh1 = setInterval(function () {
          log("Проверка температуры тёплого пола в  {},  Температура = {}, Уставка = {} , timer_id_fh1 = {}", _fh_namber , dev[_fh_condition],dev[_fh_set] , timer_id_fh1 );
           if  (dev[ _fh_condition ] > dev[_fh_set]+_fh_delta) {
            log("Температура в {} выше уставки, выключаем реле ", _fh_namber);
            dev[_fh_rele]=true;
            return;
            }
          if  ( dev[ _fh_condition ] < dev[_fh_set]-_fh_delta) {
              dev[_fh_rele]=false;
              log("Температура в {} ниже уставки, включаем реле timer_id_fh1 {} ", _fh_namber,timer_id_fh1);
            
              return;
              }
        },_fh_frequency);

        return;
      }
  
      log ("Выключаем модуль тёплых полов в  {} , timer_id_fh1 {}", _fh_namber, timer_id_fh1);
         dev[_fh_rele]=true;
          clearTimeout (timer_id_fh1);
     }
   });
  