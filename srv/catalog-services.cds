using {com.logali as logali} from '../db/shema';

service CatalogService {
entity SalesOrder          as
        select from logali.SalesOrder {
                      ID @mandatory, 
                      email @mandatory, 
                      firtsname @mandatory, 
                      lastname @mandatory, 
                      country, 
                      createon, 
                      deliverydate,
                      orderstatus,
                      imagenurl, 
                      item 
                    };

entity SalesItem          as
        select from logali.SalesItem {
                      ID @mandatory, 
                      name @mandatory, 
                      description @mandatory, 
                      releasedate,
                      discontinueddate, 
                      price @mandatory, 
                      height,
                      width,
                      depth, 
                      quantity @(mandatory,assert.range: [0.00,100.00]),
                      unitofmeasuare @mandatory,
                    };
}