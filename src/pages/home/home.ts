import { Component } from '@angular/core';
import { defaultFormReducer} from '@angular-redux/form';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import { FormGroup, FormBuilder } from '@angular/forms';

declare var require;

var reduxLogger = require('redux-logger');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userForm: FormGroup;

  constructor(public store: NgRedux<any>, public devTools: DevToolsExtension, public formBuilder: FormBuilder) {

    this.userForm = formBuilder.group({
      name: '',
      email: '',
      address: formBuilder.group({
        country: '',
        city: '',
      })
    });

    const INITIAL_STATE = {
      myForm: {
        name: '',
        email: '',
        address: {
          country: '',
          city: ''
        }
      }
    };

    this.store.configureStore(
      defaultFormReducer(),
      INITIAL_STATE,
      [reduxLogger.createLogger()],
      devTools.isEnabled() ? [devTools.enhancer()] : []);
  }

  ngOnInit() {
    const nameControl = this.userForm.controls["name"];

    nameControl.valueChanges.subscribe(value => {
      if (value.trim() === '') {
        nameControl.setErrors({
          required: true
        });
      }
    });
  }


  onFormSubmitted() {
    console.log(this.store.getState());
    // Do the work here
  }
}
