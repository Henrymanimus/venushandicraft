
 function myFunction() {
    var y = document.getElementById("open");
    if(y.style.width === "100%"){
        y.style.width = "0%";
      
    } 
    else{
      y.style.width = "100%";
      
    }
  }
  function myChange(x){
    x.classList.toggle("change");
  }
      
  /*FORM IN*/
function FormIn() {
 //mail
 e=dk.mail.value;
 em= /^\w+[@]\w+[.]\w+([.]\w)?$/;
  if(!em.test(e)){
   document.getElementById("eml").style.border = " 2px solid red";
   document.getElementById("mode").style.color = " red";
      text = "Email address is invalid";  
      document.getElementById("mode").innerHTML = text;
       return false;
  }
  else {
   document.getElementById("eml").style.border = " 2px solid green";
   text = "";
}
document.getElementById("mode").innerHTML = text;

    //Password
    p=dk.pass.value;
    pas= /^\w{6,12}$/;
   if(!pas.test(p)){
    document.getElementById("pa").style.border = " 2px solid red";
    document.getElementById("demo").style.color = " red";
      text1 = "Password field is required. Password must be [6-12] character";
       document.getElementById("demo").innerHTML = text1;
      return false; 
   }
    else {
    text1 = "";
    document.getElementById("pa").style.border = " 2px solid green";
    document.getElementById("demo").innerHTML = text1;
    return true;
}
}
  /*FORM UP*/
  function FormUp() {
    //mail
    e=signup.emai.value;
    em= /^\w+[@]\w+[.]\w+([.]\w)?$/;
     if(!em.test(e)){
      document.getElementById("ma").style.border = " 2px solid red";
      document.getElementById("up").style.color = " red";
         text1 = "Email address is invalid";  
         document.getElementById("up").innerHTML = text1;
          return false;
     }
     else {
      document.getElementById("ma").style.border = " 2px solid green";
      text3 = "";
   }
   document.getElementById("up").innerHTML = text3;
  }
    /*FORM CONTACT*/
function FormContact() {

  //Username
  n=dk2.ten.value;
  na= /^\w+$/;
 if(!na.test(n)){
  document.getElementById("textname").style.border = " 2px solid red";
  document.getElementById("demoarrange").style.color = " red";
   textarrange = "Name field is required";  
   document.getElementById("demoarrange").innerHTML = textarrange;
   return false;
 }

 else {
  textarrange = "";
  document.getElementById("textname").style.border = " 2px solid green";

}
document.getElementById("demoarrange").innerHTML = textarrange;

    //mail
    e1=dk2.emaila.value;
    em1= /^\w+[@]\w+[.]\w+([.]\w)?$/;
     if(!em1.test(e1)){
      document.getElementById("textemail").style.border = " 2px solid red";
      document.getElementById("demoarrange1").style.color = " red";
      text5 = "Email address is invalid";  
      document.getElementById("demoarrange1").innerHTML = text5;
      return false;
      
     }
     else {
      document.getElementById("textemail").style.border = " 2px solid green";
      text4 = "";
     
     }
   document.getElementById("demoarrange1").innerHTML = text4;
     //Message
  mes=dk2.M1.value;
  messa= /^\w+$/;
 if(!messa.test(mes)){
  document.getElementById("me").style.border = " 2px solid red";
  document.getElementById("demoarrange2").style.color = " red";
   textarrange2 = "Message field is required";  
   document.getElementById("demoarrange2").innerHTML = textarrange2;
   return false;
 }

 else {
  textarrange2 = "";
  document.getElementById("me").style.border = " 2px solid green";

}
document.getElementById("demoarrange2").innerHTML = textarrange2;
}
// FORM REGISTER VALIDATE
// ?????i t?????ng `Validator`
function Validator(options) {
  function getParent(element, selector) {
      while (element.parentElement) {
          if (element.parentElement.matches(selector)) {
              return element.parentElement;
          }
          element = element.parentElement;
      }
  }

  var selectorRules = {};

  // H??m th???c hi???n validate
  function validate(inputElement, rule) {
      var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
      var errorMessage;

      // L???y ra c??c rules c???a selector
      var rules = selectorRules[rule.selector];
      
      // L???p qua t???ng rule & ki???m tra
      // N???u c?? l???i th?? d???ng vi???c ki???m
      for (var i = 0; i < rules.length; ++i) {
          switch (inputElement.type) {
              case 'radio':
              case 'checkbox':
                  errorMessage = rules[i](
                      formElement.querySelector(rule.selector + ':checked')
                  );
                  break;
              default:
                  errorMessage = rules[i](inputElement.value);
          }
          if (errorMessage) break;
      }
      
      if (errorMessage) {
          errorElement.innerText = errorMessage;
          getParent(inputElement, options.formGroupSelector).classList.add('invalid');
      } else {
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
      }

      return !errorMessage;
  }

  // L???y element c???a form c???n validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
      // Khi submit form
      formElement.onsubmit = function (e) {
          e.preventDefault();

          var isFormValid = true;

          // L???p qua t???ng rules v?? validate
          options.rules.forEach(function (rule) {
              var inputElement = formElement.querySelector(rule.selector);
              var isValid = validate(inputElement, rule);
              if (!isValid) {
                  isFormValid = false;
              }
          });

          if (isFormValid) {
              // Tr?????ng h???p submit v???i javascript
              if (typeof options.onSubmit === 'function') {
                  var enableInputs = formElement.querySelectorAll('[name]');
                  var formValues = Array.from(enableInputs).reduce(function (values, input) {
                      
                      switch(input.type) {
                          case 'radio':
                              values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                              break;
                          case 'checkbox':
                              if (!input.matches(':checked')) {
                                  values[input.name] = '';
                                  return values;
                              }
                              if (!Array.isArray(values[input.name])) {
                                  values[input.name] = [];
                              }
                              values[input.name].push(input.value);
                              break;
                          case 'file':
                              values[input.name] = input.files;
                              break;
                          default:
                              values[input.name] = input.value;
                      }

                      return values;
                  }, {});
                  options.onSubmit(formValues);
              }
              // Tr?????ng h???p submit v???i h??nh vi m???c ?????nh
              else {
                  formElement.submit();
              }
          }
      }

      // L???p qua m???i rule v?? x??? l?? (l???ng nghe s??? ki???n blur, input, ...)
      options.rules.forEach(function (rule) {

          // L??u l???i c??c rules cho m???i input
          if (Array.isArray(selectorRules[rule.selector])) {
              selectorRules[rule.selector].push(rule.test);
          } else {
              selectorRules[rule.selector] = [rule.test];
          }

          var inputElements = formElement.querySelectorAll(rule.selector);

          Array.from(inputElements).forEach(function (inputElement) {
             // X??? l?? tr?????ng h???p blur kh???i input
              inputElement.onblur = function () {
                  validate(inputElement, rule);
              }

              // X??? l?? m???i khi ng?????i d??ng nh???p v??o input
              inputElement.oninput = function () {
                  var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                  errorElement.innerText = '';
                  getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
              } 
          });
      });
  }

}



// ?????nh ngh??a rules
// Nguy??n t???c c???a c??c rules:
// 1. Khi c?? l???i => Tr??? ra message l???i
// 2. Khi h???p l??? => Kh??ng tr??? ra c??i g?? c??? (undefined)
Validator.isRequired = function (selector, message) {
  return {
      selector: selector,
      test: function (value) {
          return value ? undefined :  message || 'Please enter th?? field'
      }
  };
}

Validator.isEmail = function (selector, message) {
  return {
      selector: selector,
      test: function (value) {
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return regex.test(value) ? undefined :  message || 'This field must be email';
      }
  };
}

Validator.minLength = function (selector, min, message) {
  return {
      selector: selector,
      test: function (value) {
          return value.length >= min ? undefined :  message || `Password must be entered at least ${min} character`;
      }
  };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
      selector: selector,
      test: function (value) {
          return value === getConfirmValue() ? undefined : message || 'Input value is incorrect';
      }
  }
}

 