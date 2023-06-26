using {sapbackend as external} from './external/sapbackend';

define service sapbackend1 {
    @cds.persistence: {
        table,
        skip: false
    }
    @cds.autoexpose
    entity Incidents as select from external.IncidentsSet;

}
@protocol: 'rest'
service RestService {
entity Incidents as projection on    external.IncidentsSet;

}