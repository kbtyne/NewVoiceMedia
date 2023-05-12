import { LightningElement, track, wire } from 'lwc';
import getCases from '@salesforce/apex/getRecordDataController.getCases'

export default class relatedCaseList extends LightningElement {
    @track columns= [
        {label: 'Id', fieldName: 'Id'}
    ];
    @track caseList;
    @wire(getCases) wiredCases({data, error}) {
            if (data) {
                this.caseList=data;
            console.log(data);
            }   else if (error) {
                console.log(error);
            }
        }
    }