<script src="https://appsfor.marketingcloudapps.com/sdk/js/1.3.2/postmonger.js"></script>
<script>
  const connection = new Postmonger.Session();

  connection.on('initActivity', (payload) => {
    // init from payload
  });

  connection.on('clickedNext', () => {
    const inArgs = [{ email: '{{Contact.Default.Email}}' }];
    connection.trigger('updateActivity', {
      arguments: {
        execute: {
          inArguments: inArgs
        }
      },
      metaData: {
        isConfigured: true
      }
    });
  });

  connection.trigger('ready');
</script>
