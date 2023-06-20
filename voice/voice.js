import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import VOICECALL_OBJECT from '@salesforce/schema/VoiceCall';
import CALLTYPE_FIELD from '@salesforce/schema/VoiceCall.CallType';
import DISPLAY_TO_AGENT_FIELD from '@salesforce/schema/VoiceCall.Display_to_Agent__c';

export default class voice extends LightningElement {
    @api recordId;
    voicecallObject = VOICECALL_OBJECT;

    @wire(getRecord, {
        recordId: '$recordId', 
        fields: [CALLTYPE_FIELD, DISPLAY_TO_AGENT_FIELD]})
    record;

    get calltype() {
          return this.record.data ? getFieldValue(this.record.data, CALLTYPE_FIELD) : ' ' ;
    }
   
    get displaytext(){
        return this.record.data ? getFieldValue(this.record.data, DISPLAY_TO_AGENT_FIELD) : ' ' ;
    }

    get titletext() {
        return `${this.calltype} ${this.displaytext}`
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

