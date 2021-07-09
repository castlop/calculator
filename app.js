(() => {

  'use strict';


  class CalcScreen {
    constructor(expression) {
      this.$screen = document.querySelector('.screen');
      this.expression = expression;
    }

    refresh() {
      this.$screen.textContent = this.expression.getTerms()
    }

    clean() {
      this.expression.reset();
      this.refresh();
    }
  };


  class MathExpression {
    constructor() {
      this.terms = '';
    }
    
    getTerms() {
      return this.terms;
    }

    reset() {
      this.terms = '';
    }
    
    isEmpty() {
      return (this.terms === '');
    }
    
    lastIsOperator() {
      return (this.terms.endsWith('+') || this.terms.endsWith('-') || this.terms.endsWith('*') || this.terms.endsWith('/'))
      
      /*
      ['+', '-', '*', '/'].forEach(operator => {
        if (this.terms.endsWith(operator)) {
          console.log(operator);
          return true;
        }
      });
      return false;*/
    }

    addNumner(number) {
      if (number === '00') {
        if (!this.lastIsOperator()) {
          this.terms = this.terms.concat(number);
        }
      } else if (!this.terms.startsWith('0')) {
        this.terms = this.terms.concat(number);
      }
    }
   
   addOperator(operator) {
     if (!this.isEmpty() && !this.lastIsOperator()) {
       this.terms = this.terms.concat(operator);
     }
   }

    removeLast() {
      this.terms = this.terms.slice(0, -1)
    }

    evaluate() {
      this.terms = `${eval(this.terms)}`;
    }

  }
  
  
  const $buttons = document.querySelector('.buttons');

  
  let expression = new MathExpression();
  let screen = new CalcScreen(expression);
  
  
  const allowedValues = '00123456789.';
  const allowedOperators = '+-*/';

  
  
  $buttons.addEventListener('click', (event) => {

    let buttonValue = event.target.innerText;

    if (allowedValues.includes(buttonValue)) {
      expression.addNumner(buttonValue);
      screen.refresh();
    } else if (allowedOperators.includes(buttonValue)) {
      expression.addOperator(buttonValue);
      screen.refresh();
    } else if (buttonValue === '=') {
      expression.evaluate();
      screen.refresh();
    } else if (buttonValue === '<') {
      expression.removeLast();
      screen.refresh();
    } else if (buttonValue === 'CE') {
      screen.clean();
    }
    
    // console.log(expression.getTerms());
    
  });
})();