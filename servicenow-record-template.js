(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    
    var templateName = request.getHeader('templateName');
    var tableName = request.getHeader('tableName');
    var requestBody = request.body;
    var requestData = requestBody.data;
    
    var gdt = new GlideDateTime();
        
    if (!templateName)
    {
    //If templateName header was not set or was malformed, return an error.
    response.setStatus(417);
    return 'Unable to process request. Template header \'templateName\' not defined. ' + 'Please define a request header called \'templateName\'';
    }
    if (!tableName)
    {
    //If templateName header was not set or was malformed, return an error.
    response.setStatus(417);
    return 'Unable to process request. Table header \'templateName\' not defined. ' + 'Please define a request header called \'tableName\'';
    }
    
    var res = {};
    templateName = templateName.trim();
    var record = new GlideRecord(tableName);
    record.initialize();
    record.applyTemplate(templateName);
        
    record.setValue("type", "standard");
    record.setValue('description',requestData.description);
    record.setValue('start_date', gdt);
    record.setValue('end_date', gdt);
    record.setValue('state', -2); // Scheduled
    record.setValue('state', -1); // Implement
    record.setValue('state', 0); // Review
    record.setValue('state', 3); // Closed
    record.setValue('close_code', 'Successful'); 
    record.setValue('close_notes', 'Successful'); 
        
    var id = record.insert();
    res['record_sys_id'] = id;
    return res;
    })(request, response);
