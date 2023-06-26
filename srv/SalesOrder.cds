using com.logali as logali from '../db/shema';

service ManageOrder {

    entity GetSalesOrder as projection on logali.SalesOrder;
    type cancelOrderReturn {
        status  : String enum {
            Succeeded;
            Failed
        };
        message : String
    };

}