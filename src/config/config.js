

module.exports = {
    server: {
      prod: {
        protocol: 'http',
        host: '169.55.109.90',
        service: 'beer4T',
        port: '80',
        gaTrackingId: 'UA-118051090-2',
      },
      dev: {
        protocol: 'http',
        host: '10.30.7.91',
        service: 'beer4T',
        port: '80',
        gaTrackingId: 'UA-118051090-1',
      },
      qa: {
        protocol: 'http',
        host: '169.55.109.90',
        service: 'beer4TQA',
        port: '80',
        gaTrackingId: 'UA-118051090-1',
      },
      qaext: {
        protocol: 'http',
        host: '169.55.69.40',
        service: 'beer4TQA',
        port: '80',
        gaTrackingId: 'UA-118051090-1',
      },
    },
    env: 'dev',
    constants: {
      URL: 'http://localhost:8080/',
    }
  };
  