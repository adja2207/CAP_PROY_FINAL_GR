namespace com.logali;
using {cuid, 
       managed} from '@sap/cds/common';

type ZDE_MEINS: String(2);

	entity SalesOrder: cuid, managed {
	    key email       : String(30);
            firtsname       : String(30);
            lastname        : String(30);
            country         : String(30);
            createon        : Date;
            deliverydate    : DateTime;
            orderstatus     : Integer; 
            imagenurl       : String;
            item            : Association to SalesItem;
	};

	entity SalesItem :cuid, managed {
            name       :  String(40);
            description : localized String(40);
            releasedate     : DateTime;
            discontinueddate     : DateTime; 
            price : Decimal(12,2); 
            height : Decimal(15,3); 
            width : Decimal(13,3);
            depth : Decimal(12,2);
            quantity : Decimal(12,2);
            unitofmeasuare: ZDE_MEINS;
            
	};

entity SelSalesOrder as
    select from SalesOrder {
        *
    };
 