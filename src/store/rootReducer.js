import { combineReducers } from '@reduxjs/toolkit';
import { reducer as generalsettingsReducer } from 'src/slices/generalsettings';
import { reducer as formReducer } from 'redux-form';
import { reducer as organizerReducer } from 'src/slices/organizer';
import { reducer as eventagendaReducer } from 'src/slices/eventagenda';
import { reducer as exhibitorReducer } from 'src/slices/exhibitor';
import { reducer as enquiryReducer } from 'src/slices/enquiry';
import { reducer as eventReducer } from 'src/slices/event';
import { reducer as visitorReducer } from 'src/slices/visitor';

const rootReducer = combineReducers({
  form: formReducer,
  generalsettings: generalsettingsReducer,
  organizer: organizerReducer,
  eventagenda: eventagendaReducer,
  exhibitor: exhibitorReducer,
  enquiry: enquiryReducer,  
  event: eventReducer,
  visitor: visitorReducer
});
export default rootReducer;