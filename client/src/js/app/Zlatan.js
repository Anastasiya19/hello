function Zlatan (data) {



    //Query status
    this.mobiles = data.mobiles;
    // (for the more functionality )
    this.query_object = data.query_object;
    // how many phones are skipped in the db call (for the more functionality )
    this.skip = data.skip || 20;

    this.mobiles_processed = [];

    this.contexts = [];

    this.contexts_attributes_detailed = [];

    this.contexts_attributes_summary = [];

    this.comparison_context = {};

}