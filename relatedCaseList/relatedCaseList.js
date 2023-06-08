/**
 * @description       : Lightning web component to display existing Cases by Serial Number
 * @author            : kendra@snowytree.com
 * @last modified on  : 05-17-2023
 * @last modified by  : kendra@snowytree.com
 * Modifications Log 
 * Ver   Date         Author                  Modification
 * 1.0   05-17-2023   kendra@snowytree.com   Initial Version
**/

import { LightningElement, track, wire, api } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import getCases from '@salesforce/apex/getRecordDataController.getCases';

import SERIALNUMBER__C_FIELD from '@salesforce/schema/Case.SerialNumber__c';

const fields=[SERIALNUMBER__C_FIELD]
const columns= [
    {   
        label: 'Number',
        fieldName: 'casLink',
        type: 'url',
        typeAttributes: {label: {fieldName: 'CaseNumber'}}
    }, {
        label: 'Subject',
        fieldName: 'Subject',
        type: 'text',
    }, {
        label: 'Received',
        fieldName: 'CreatedDate',
        type: 'date',
    }
];

export default class relatedCaseList extends LightningElement {
    data=[];
    columns=columns;

    @api recordId;
    @track record;
    @track data;
    @track caseList;

/* 
@description Get recordId and Serial Number to match Cases
@return serialNumber
@return recordId  
*/

    @wire (getRecord, {recordId:'$recordId', fields})
    record;
    
    get serialNumber() {
        console.log(this.record.data, SERIALNUMBER__C_FIELD)
        return getFieldValue(this.record.data, SERIALNUMBER__C_FIELD)
    };

    /**
    * @description Use Apex getRecordDataController for getCases to return related Cases. Create hyperlinks with response data.
    * @param serialNumber
    * @param recordId
    * @return wiredCases 
    **/

    @wire(getCases, {serialNumber: '$serialNumber', recordId:'$recordId'}) wiredCases({error, data}) {
            if (data) {
                    data=JSON.parse(JSON.stringify(data));

                    data.forEach(res => {
                    res.CaseNumber= res.CaseNumber;
                    res.CaseOrigin= res.CaseOrigin;
                    res.CaseSubject= res.CaseSubject;
                    res.CaseCreatedDate= res.CaseCreatedDate;
                    res.casLink= '/' + res.Id;
                    });

                    this.data=data;
                    this.error=undefined;
            } else if (error) {
                this.error=error;
            }
    }
  
    }

   