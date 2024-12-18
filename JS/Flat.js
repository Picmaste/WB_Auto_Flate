defineVirtualDevice("Room",  {
 
  title: "Сценарии",
 	cells: {
      ALL_OUT:  {
        title: "Сценарий всё ушли",
        type : "switch",
          value : true,
        },
       All_Lite_Off:  {
        title: "Выключить всё",
        type : "switch",
          value : true,
        },
      } //cells 
});    //      Room





    var device_output_light="wb-mr6c_115"   // A2  "Модуль реле  Основной "
    var device_output_DIM="wb-mdm3_105"     // A1  "Модуль димирования / подсветка"
    var device_output_Hot="wb-mr6c_48"     //// A3 " Тёплый пол "
    var device_output_light1="wb-mr6c_93"   // A7  "Модуль реле дополнительный "
    var device_output_mwac="wb-mwac_80"     // Модуль протечки 
    var DD_input_Holl="wb-gpio/EXT2_IN1";   // Датчик движения в коридоре 
    var DD_input_CLoset="wb-gpio/EXT2_IN2";   // Датчик движения в Ванной
    var DD_input_CLoset2="wb-gpio/EXT2_IN3";   // Датчик движения в туалете

	var button_AllOut_holl="wb-gpio/EXT1_IN2"   //  Кнопка , я ушёл 
	var button_Light_Off="wb-gpio/EXT1_IN1"    //  Выключить весь свет .

	


// Не трогать   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

var _rele_Kt_Lite=device_output_light1+"/K6";     // Кухня 
var _rele_SubLite=device_output_light1+"/K6";   // Подсветка общая  LX-6
var _rele_holl_Lite=device_output_light1+"/K6"; ; 
var _rele_Br_Lite=device_output_light1+"/K6";        // Ванная1
var _rele_WC_Lite=device_output_light1+"/K6";          // Ванная1
var _rele_Br_SubLite=device_output_light1+"/K6";                       // Ванная1 
var _rele_Kt_SubLite=device_output_light1+"/K6";                     // Кухня Подсветка  
var _rele_Lr_Lite=device_output_light1+"/K6";         // Гостинная 
var _rele_Lr_SubLite=device_output_light1+"/K6";      // Гостинная подсветка 
var _rele_Sr_Lite=device_output_light1+"/K6";            // Спальня
var _rele_Sr_SubLite=device_output_light1+"/K6";        // Спальня
var _rele_Sr_BRA=device_output_light1+"/K6"; ;         // Спальня
var _rele_Sr_Bin=device_output_light1+"/K6";     ;     // Спальня   Гардероб 

// Не трогать  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


      //   A2  "Модуль реле  Основной "

var _rele_Kt_Lite=device_output_light+"/K1";   //    38.1
var _rele_Lr_Lite=device_output_light+"/K2";   //    38.3
var _rele_holl_Lite=device_output_light+"/K3";   //   38.4
var _rele_HollWay_Lite=device_output_light+"/K4";   //   38.4-1
var _rele_Sr_SubLite=device_output_light+"/K5";   //   38,7
//var _rele_ =device_output_light+"/K6";   // 

        // A7 "Модуль реле  дополнительны"
var _rele_Br_Lite =device_output_light1+"/K1";   //   38,5
var _rele_WC_Lite=device_output_light1+"/K2";   //    38,5-1
var _rele_SubLite=device_output_light1+"/K3";   //    38,6    Подсветка 
//var _rele_=device_output_light1+"/K4";   // 
//var _rele_=device_output_light1+"/K5";   // 
//var _rele_=device_output_light1+"/K6";   // 


          // A1  "Модуль димирования / подсветка"

var _rele_Lr_SubLite   =  device_output_DIM +"/K1";      //  38.2
var _rele_Sr_Lite   =  device_output_DIM +"/K2";      //     38,8
//var _rele_   =  device_output_DIM +"/K3";      //

        //  MWAC 

  var _rele_Br_mwac=device_output_mwac+"/K1"       // V
  var _rele_WC_mwac=device_output_mwac+"/K2"
        



/*
Kt_Lite       // Кухня 
SubLite   // Подсветка общая  LX-6
holl_Lite   // Холл
Br_Lite        // Ванная1
WC_Lite        // Туалет
Br_SubLite                       // Ванная подсветка 
Kt_SubLite      // Кухня Подсветка  
Lr_Lite =     // Гостинная 
Lr_SubLite     // Гостинная подсветка 
Sr_Lite =   // Спальня
Sr_SubLite    // Спальня
Sr_BRA    // Спальня
Sr_Bin           // Спальня   Гардероб 
HollWay_Lite    // Коридор
*/








defineVirtualDevice("Valve", {
  title: "Запорные краны ",	
  cells: {
    switch: {
     	title: "Краны  Вкл/Выкл ",
      type: "switch",
			value: false
    	},
  }
});



defineRule({    // 
  whenChanged: ["Valve/switch",_rele_Br_mwac,_rele_WC_mwac], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {


     
     log("Log Valve 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_HollWay_Lite );

     
     if (devName=="Valve"){
      log("Log Valve 1 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_HollWay_Lite );
      
       dev[_rele_Br_mwac] =  newValue;
       dev[_rele_WC_mwac] =  newValue;
       
        }	
     else 
     {
      log("Log Valve 2 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_HollWay_Lite); 
        if (cellName=="/K1"){
        dev[_rele_WC_mwac]=dev[_rele_Br_mwac]
        }
        if (cellName=="/K2"){
        dev[_rele_Br_mwac]=dev[_rele_WC_mwac]
        }
        dev["Valve/switch"] = dev[_rele_WC_mwac]
       } 
     }  
 });


defineVirtualDevice("Hollway", {
  title: "Коридор",	
  cells: {
    switch: {
     	title: "Свет Вкл/Выкл ",
      type: "switch",
			value: false
    	},
  }
});

defineRule({    // 
  whenChanged: ["Hollway/switch",_rele_HollWay_Lite], 
   then: function (newValue, devName, cellName) {


     
     log("Log HOLLWay 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_HollWay_Lite );

      if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
     
     if (devName=="Hollway"){
      log("Log HOLLway 1 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_HollWay_Lite );
       dev[_rele_HollWay_Lite] =  newValue;
        }	
     else 
     {
      log("Log HOLLway 2 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_HollWay_Lite); 
      dev["Hollway/switch"] = dev[_rele_HollWay_Lite];
     } 
     }  
 });


//
defineVirtualDevice("Holl", {
  title: "Хол",	
  cells: {
    switch: {
     		title: "Свет Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
   	    }
});

defineRule({    // inflat -1
  whenChanged: ["Holl/switch",_rele_holl_Lite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {


     
     log("Log HOLL 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_holl_Lite );

      if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
     
     if (devName=="Holl"){
      log("Log HOLL 1 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_holl_Lite );
       dev[_rele_holl_Lite] =  newValue;
        }	
     else 
     {
      log("Log HOLL 2 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_holl_Lite); 
      dev["Holl/switch"] = dev[_rele_holl_Lite];
     } 
     }  
 });


defineVirtualDevice("LivingRoom_Lamp", {
  title: "Гостинная Свет",	
  cells: {
   	  switch: {
     		title: "Свет Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
   	  SubLite: {
     		title: "Подсветка Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
    }
});

defineVirtualDevice("LivingRoom_Sub", {
  title: "Гостинная Подсветка",	
  cells: {
   	    switch: {
     		title: "Подсветка Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
    }
});





defineRule({    // inflat -1
  whenChanged: ["LivingRoom_Lamp/switch",_rele_Lr_Lite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {
     log("Log LivingRoom_Lamp 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_holl_Lite );

      if (newValue){
      dev["Room/All_Lite_Off"] = false;
      }
     
     if (devName=="LivingRoom_Lamp"){
          dev[_rele_Lr_Lite] =  newValue;
        }	
     else 
        {
          dev["LivingRoom_Lamp/switch"] = dev[_rele_Lr_Lite];
     } 
    }  
 });

defineRule({    // inflat -1
    whenChanged: ["LivingRoom_Sub/switch",_rele_Lr_SubLite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

      if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
 	 
     if (devName=="LivingRoom_Sub"){
         dev[_rele_Lr_SubLite] =  newValue;
        }	
     else {
          dev["LivingRoom_Sub/switch"] = dev[_rele_Lr_SubLite];
     } 
   }  
 });


defineVirtualDevice("KitchenRoom_Lamp", {
  title: "Кухня Свет",	
  cells: {
   	  switch: {
     		title: "Свет Вкл/Выкл ",
       	type: "switch",
	  		value: false
    	},
  }
});


defineVirtualDevice("KitchenRoom_Sub", {
  title: "Кухня Подсветка",	
  cells: {
   	  switch: {
     		title: "Подсветка Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
    }
});




defineRule({    // inflat -1
  whenChanged: ["KitchenRoom_Lamp/switch",_rele_Kt_Lite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {
 if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
     
     log("Log KitchenRoom_Lamp 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_holl_Lite );
 	 
     if (devName=="KitchenRoom_Lamp"){
      log("Log KitchenRoom_Lamp 1 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_holl_Lite );
         dev[_rele_Kt_Lite] =  newValue;
        }	
     else 
     {
      log("Log KitchenRoom_Lamp 2 - devName= {} ,cellName= {} =, Value=  {} , dev  {} ",devName,cellName,newValue,_rele_holl_Lite); 
        dev["KitchenRoom_Lamp/switch"] = dev[_rele_Kt_Lite];
     } 
     }  
 });

defineRule({    // inflat -1
    whenChanged: ["KitchenRoom_Sub/switch",_rele_Kt_SubLite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

      if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
     
 	 
     if (devName=="KitchenRoom_Sub"){
         dev[_rele_Kt_SubLite] =  newValue;
        }	
     else {
          dev["KitchenRoom_Sub/switch"] = dev[_rele_Kt_SubLite];
     } 
   }  
 });


defineVirtualDevice("SleepingRoom_Lamp", {
  title: "Спальня Свет",	
  cells: {
   	  switch: {
     		title: "Свет Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
    }
});

defineVirtualDevice("SleepingRoom_Sub", {
  title: "Спальня Подсветка",	
  cells: {
   	  switch: {
     		title: "Подсветка Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
    }
});

defineVirtualDevice("SleepingRoom_Bra", {
  title: "Спальня Бра",	
  cells: {
   	  switch: {
     		title: "Бра> Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
    }
});

defineVirtualDevice("SleepingRoom_Bin", {
  title: "Спальня Гардероб",	
  cells: {
   	  switch: {
     		title: "Свет Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
    }
});



defineRule({    // inflat -1
  whenChanged: ["SleepingRoom_Lamp/switch",_rele_Sr_Lite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

     log("Log SleepingRoom Lamp 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_holl_Lite );
 
     if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
     
     if (devName=="SleepingRoom_Lamp"){
         dev[_rele_Sr_Lite] =  newValue;
        }	
     else 
     {
        dev["SleepingRoom_Lamp/switch"] = dev[_rele_Sr_Lite];
     } 
     }  
 });

defineRule({    // inflat -1
    whenChanged: ["SleepingRoom_Sub/switch",_rele_Sr_SubLite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {
 if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
     
     if (devName=="SleepingRoom_Sub"){
           dev[_rele_Sr_SubLite] =  newValue;
        }	
     else 
     {
          dev["SleepingRoom_Sub/switch"] = dev[_rele_Sr_SubLite];
     } 
     }  
 });


defineRule({    // inflat -1
  whenChanged: ["SleepingRoom_Bra/switch",_rele_Sr_BRA], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

     if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
  
 	 
     if (devName=="SleepingRoom_Bra"){
         dev[_rele_Sr_BRA] =  newValue;
        }	
     else 
     {
            dev["SleepingRoom_Bra/switch"] = dev[_rele_Sr_BRA];
     } 
     }  
 });


defineRule({    // inflat -1
  whenChanged: ["SleepingRoom_Bin/switch",_rele_Sr_Bin], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

   if (newValue){
      dev["Room/All_Lite_Off"] = false;
        }
 	 
     if (devName=="SleepingRoom_Bin"){
         dev[_rele_Sr_Bin] =  newValue;
        }	
     else 
     {
        dev["SleepingRoom_Bin/switch"] = dev[_rele_Sr_Bin];
     } 
     }  
 });




defineVirtualDevice("BathRoom", {
  title: "Ванная",	
  cells: {
   	  switch: {
     		title: "Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
   	  }
});


defineRule({    // inflat -1
  whenChanged: ["BathRoom/switch",_rele_Br_Lite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

     log("Log HOLL 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_holl_Lite );
 
     if (newValue){
      dev["Room/All_Lite_Off"] = false;
      }
     
     if ((devName=="BathRoom")){
       dev[_rele_Br_Lite] =  newValue;
        }	
     else 
     {
      dev["BathRoom/switch"] = dev[_rele_Br_Lite];
     } 
     }  
 });


//
defineVirtualDevice("WC", {
  title: "Туалет",	
  cells: {
   	  switch: {
     		title: "Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
   	  }
});


defineRule({    // inflat -1
  whenChanged: ["WC/switch",_rele_WC_Lite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

     log("Log WC 0 - devName= {} ,cellName= {} =, Value=  {} , dev =  {} ",devName,cellName,newValue,_rele_holl_Lite );
 
     if (newValue){
      dev["Room/All_Lite_Off"] = false;
      }
     
     if ((devName=="WC")){
       dev[_rele_WC_Lite] =  newValue;
        }	
     else 
     {
      dev["WC/switch"] = dev[_rele_WC_Lite];
     } 
     }  
 });


//


defineVirtualDevice("SubLite", {
  title: "Подсветка",	
  cells: {
   	  switch: {
     		title: "Вкл/Выкл ",
          	type: "switch",
			value: false
    		},
   	  }
});


defineRule({    // inflat -1
  whenChanged: ["SubLite/switch",_rele_SubLite], // правило сработает, когда значение параметра изменится на истинное 
   then: function (newValue, devName, cellName) {

   if (newValue){
      dev["Room/All_Lite_Off"] = false;
     
   }
 	      if ((devName=="SubLite")){
       dev[_rele_SubLite] =  newValue;
        }	
     else 
     {
      dev["SubLite/switch"] = dev[_rele_SubLite];
     } 
     }  
 });




defineRule({  //   Сценарий "Я пришёл"
   whenChanged:  [DD_input_Holl,"Room/ALL_OUT"], // 
  then: function (newValue, devName, cellName) {
      log("Log1 - devName= {} ,cellName= {} =, Value=  {}  ",devName,cellName,newValue); 

      if ((cellName) == "EXT2_IN1" )   {
        log("Log2 - devName= {} ,cellName= {} =, Value=  {}  ",devName,cellName,newValue); 
          if ((newValue) && dev["Room/ALL_OUT" ]  ) {
      
            log("Log1 - devName= {} ,cellName= {} =, Value=  {}  ",devName,cellName,newValue); 
            dev["Room/ALL_OUT"] = false;   // Отключаем сценарний я ушёл
            dev[_rele_holl_Lite]= true;   //ХОЛЛ
            dev[_rele_HollWay_Lite]= true;   //ХОЛЛ

            
          }
      }
    }
});


  defineRule({  //   Ванная  
  whenChanged: [DD_input_CLoset], // правило сработает, когда значение параметра изменится на истинное 
  then: function (newValue, devName, cellName) {
    
    if  ( newValue )  {
    log("Log1 - devName= {} ,cellName= {} =, Value=  {}  ",devName,cellName,newValue);
      dev[_rele_Br_Lite]= true; 
      dev["Room/All_Lite_Off"] = false;
      }
   }
});

defineRule({  //  WC 
  whenChanged: [DD_input_CLoset2], // правило сработает, когда значение параметра изменится на истинное 
  then: function (newValue, devName, cellName) {
    
    if  ( newValue )  {
    log("Log1 - devName= {} ,cellName= {} =, Value=  {}  ",devName,cellName,newValue);
      dev[_rele_WC_Lite]= true; 
      dev["Room/All_Lite_Off"] = false;
      }
   }
});



  defineRule({  //     Отключение всего света 
  whenChanged: [button_Light_Off,"Room/All_Lite_Off"], 
  then: function (newValue, devName, cellName) {

        if  ( newValue )  {

      dev[device_output_light]["K1"]= false;  //Гостинная 
      dev[device_output_light]["K2"]= false;   //ХОЛЛ
      dev[device_output_light]["K3"]= false;  //Гостинная 
      dev[device_output_light]["K4"]= false;   // Ванная 
      dev[device_output_light]["K5"]= false;   //  
      dev[device_output_light]["K6"]= false;   //  
    
      dev[device_output_light1]["K1"]= false;  //Гостинная 
      dev[device_output_light1]["K2"]= false;   //ХОЛЛ
      dev[device_output_light1]["K3"]= false;  //Гостинная 
      dev[device_output_light1]["K4"]= false;   // Ванная 
      dev[device_output_light1]["K5"]= false;   //  
      dev[device_output_light1]["K6"]= false;   //  
    
      
      dev[device_output_DIM]["K1"]=   false;       // Подсветка 
      dev[device_output_DIM]["K2"]=   false;      // Подсветка     
      dev[device_output_DIM]["K3"]=   false;      // Подсветка     
    
    } 
     }
});


defineRule({  //     Включение сценария все ушли .
  whenChanged: [button_AllOut_holl,"Room/ALL_OUT"], 
  then: function (newValue, devName, cellName) {
  log("Log ALL_OUT - devName= {} ,cellName= {} =, Value=  {}  ",devName,cellName,newValue); 

        if  ( newValue )  {
      dev["Room"]["ALL_OUT"] = true;    // включаем сценарий я ушёл
      dev["Room/All_Lite_Off"] = true;

      dev[device_output_light]["K1"]= false;  //Гостинная 
      dev[device_output_light]["K2"]= false;   //ХОЛЛ
      dev[device_output_light]["K3"]= false;  //Гостинная 
      dev[device_output_light]["K4"]= false;   // Ванная 
      dev[device_output_light]["K5"]= false;   //  
      dev[device_output_light]["K6"]= false;   //  
    
      dev[device_output_light1]["K1"]= false;  //Гостинная 
      dev[device_output_light1]["K2"]= false;   //ХОЛЛ
      dev[device_output_light1]["K3"]= false;  //Гостинная 
      dev[device_output_light1]["K4"]= false;   // Ванная 
      dev[device_output_light1]["K5"]= false;   //  
      dev[device_output_light1]["K6"]= false;   //  
    
      
      dev[device_output_DIM]["K1"]=   false;       // Подсветка 
      dev[device_output_DIM]["K2"]=   false;      // Подсветка     
      dev[device_output_DIM]["K3"]=   false;      // Подсветка     
      
        } 
     }
});
