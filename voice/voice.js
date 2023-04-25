import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import VOICECALL_OBJECT from '@salesforce/schema/VoiceCall';
import CALLTYPE_FIELD from '@salesforce/schema/VoiceCall.CallType';


export default class voice extends LightningElement {
    @api recordId;
    voicecallObject = VOICECALL_OBJECT;
    @wire(getRecord, {  
        recordId: '$recordId', 
        fields: [CALLTYPE_FIELD],}
    ) record;

    get calltype() {
          return this.record.data ? getFieldValue(this.record.data, CALLTYPE_FIELD) : ' '
          ;
    }

    get styleClass(){
        let styleClass = this.calltype;
            if (this.calltype == "Inbound") {
                styleClass='inbound' ;    
            } else if (this.calltype== "Outbound") {
                styleClass='outbound';
            } else if (this.calltype=="Transfer") {
                styleClass='transfer';
            } else {
                styleClass='callback';
            } 
        return styleClass;
     }
}
