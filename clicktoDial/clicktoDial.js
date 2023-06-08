/**
 * @description       : Lightning tile component for click-to-dial
 * @author            : kendra@snowytree.com
 * @last modified on  : 06-05-2023
 * @last modified by  : kendra@snowytree.com
 * Modifications Log 
 * Ver   Date         Author                  Modification
 * 1.0   06-05-2023   kendra@snowytree.com   Initial Version
**/

import { LightningElement, wire, api } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi'

export default class clicktoDial extends LightningElement {
    @api recordId;

/* 
@description Get recordId 
@return recordId  
*/

    @wire (getRecord, {recordId:'$recordId'})
    record;
}
   