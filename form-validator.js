var moment = require('moment');

var validator = {
  submit: null,
  numInputs: [],
  dateInputs: [],
  mailInputs: [],
  textInputs: [],
  self: this,
  // errorMsgs = [strings]
  errorMsgs: [],

  /*
    options = {
      formId: string,
      numInputs: [string],
      dateInputs: [string],
      mailInputs: [string],
      textInputs: [string],
    }
  */
  validate: function(options){
    this.init(options);
    this.validateInputs();
    let status = this.errorMsgs.length > 0 ? 'Error' : 'OK';
    return {
      status: status,
      errorMsgs: this.errorMsgs
    }
  },
  init: function(options){
    if(options.form == 'undefined'){
      this.findDOMEl(options.numInputs, 'numInputs');
      this.findDOMEl(options.dateInputs, 'dateInputs');
      this.findDOMEl(options.mailInputs, 'mailInputs');
      this.findDOMEl(options.textInputs, 'textInputs');
    }
    this.submit = options.submit;
  },
  findDOMEls: function(list, type){
    list.forEach((e) => {
      let domEl = document.getElementById(e);
      self[type].push(domEl);
    });
  },
  validateInputs: function(){
    this.validateDate();
    this.validateMail();
    this.validateNums();
    this.validateText();
  },
  validateNums: function(){
    this.numInputs.forEach(e => {
      if(isNaN(e.value) || e.value < 0){
        this.addError(e);
      }
    });
  },
  validateText: function(){
    this.textInputs.forEach(e => {
      if(e.value == undefined || e.value == ''){
        this.addError(e);
      }
    });
  },
  validateMail: function(){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.mailInputs.forEach(e => {
      if(!re.test(e.value)){
        this.addError(e);
      }
    });
  },
  validateDate: function(){
    this.mailInputs.forEach(e => {
      if(!moment(el.value, 'MM/DD/YYYY',true).isValid()){
        this.addError(e);
      }
    });
  },
  addError: function(e){
    self.errorMsgs.push(e.dataset.error-msg);
  }
}

