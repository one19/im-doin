const fs = require('fs');
const prompt = require('prompt');

const schema = {
  properties: {
    api_key: {
      description: 'API KEY'
    },
    db_name: {
      description: 'DB NAME'
    },
    sender_id: {
      description: 'SENDER ID'
    },
    email: {
      description: 'EMAIL ADDRESS'
    },
    password: {
      description: 'PASSWORD'
    },
    website: {
      description: 'WEBSITE URL'
    }
  }
};

module.exports.updateConfig = async () => {
  prompt.start();

  prompt.get(schema, (err, result) => {
    if (err) throw new Error('INVALID ANSWERS, TRY AGAIN PLEASE!');

    const envContents = Object.keys(result)
      .map(env => `${env.toUpperCase()}=${result[env]}`)
      .join('\n');

    fs.writeFileSync(`${__dirname}/.env`, envContents);
    console.log('Updated config information!');
  });
};
