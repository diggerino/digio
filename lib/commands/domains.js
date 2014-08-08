var api = require('digio-api')
, print = require('../print')
, tools = require('../tools')

var domains = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'domains',
    'list',
    [],
    'List all domains',
    function () {
      api.domains.list(function (err, data) {
        if (err) return print.error(err.message)
        console.log('\nTotal domains: ' + data.meta.total + '\n')
        data.domains.forEach(function (dom) {
          console.log('- Domain:        ' + dom.name)
          console.log('    TTL:         ' + dom.ttl)
          console.log('    Zone File:   ' + dom.zone_file + '\n')
        })
      })
    }
  )

  cmd.register(
    'domains',
    'create',
    ['<domain>', '<ip>'],
    'Create a new domain',
    function (domain, ip_address) {
      api.domains.create(domain, ip_address, function (err, data) {
        if (err) return print.error(err.message)
        print.success(domain + ' (' + ip_address + ') created')
      })
    }
  )

  cmd.register(
    'domains',
    'delete',
    ['<id>'],
    'Delete a domain with a specific ID',
    function (domain) {
      api.domains.delete(domain, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Deleted domain "' + domain + '"')
      })
    }
  )

  cmd.register(
    'domains',
    'get',
    ['<domain>'],
    'Get details of a specific domain',
    function (domain) {
      api.domains.get(domain, function (err, data) {
        if (err) return print.error(err.message)
        console.log('\n- Domain:        ' + data.domain.name)
        console.log('    TTL:         ' + data.domain.ttl)
        console.log('    Zone File:   ' + data.domain.zone_file + '\n')
      })
    }
  )

  cmd.register(
    'domains',
    'listrecords',
    ['<domain>'],
    'List records for a specific domain',
    function (domain) {
      api.domains.list_records(domain, function (err, data) {
        if (err) return print.error(err.message)
        console.log('\nTotal records: ' + data.meta.total + '\n')
        data.domain_records.forEach(function (record) {
          console.log('- Name:          ' + record.name)
          console.log('    ID:          ' + record.id)
          console.log('    Type:        ' + record.type)
          console.log('    Data:        ' + record.data)
          console.log('    Priority:    ' + record.priority)
          console.log('    Port:        ' + record.port)
          console.log('    Weight:      ' + record.weight)
          console.log('')
        })
      })
    }
  )

  cmd.register(
    'domains',
    'getrecord',
    ['<domain>', '<record_id>'],
    'Get details of a domain record',
    function (domain, record) {
      api.domains.get_record(domain, record, function (err, data) {
        if (err) return print.error(err.message)
        console.log('')
        console.log('- Name:          ' + data.domain_record.name)
        console.log('    ID:          ' + data.domain_record.id)
        console.log('    Type:        ' + data.domain_record.type)
        console.log('    Data:        ' + data.domain_record.data)
        console.log('    Priority:    ' + data.domain_record.priority)
        console.log('    Port:        ' + data.domain_record.port)
        console.log('    Weight:      ' + data.domain_record.weight)
        console.log('')
      })
    }
  )

  cmd.register(
    'domains',
    'deleterecord',
    ['<domain>', '<record_id>'],
    'Delete a domain record',
    function (domain, record_id) {
      api.delete_record(domain, record_id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Deleted record ' + record_id + ' on domain ' + domain)
      })
    }
  )

  cmd.register(
    'domains',
    'updaterecord',
    ['<domain>', '<record_id>', '<name>'],
    'Change the name of a domain record',
    function (domain, record_id, name) {
      api.update_record(domain, record_id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Domain record name on record ' + record_id + ' (' + domain + ') changed to ' + name)
      })
    }
  )

  cmd.register(
    'domains',
    'createrecord',
    ['<domain>', '<type>', '<name>', '<data>', '<priority>', '<port>', '<weight>'],
    'Create a new domain record for a specific domain',
    function (domain, type, name, data, priority, port, weight) {
      var types = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV', 'NS']
      if (types.indexOf(type) === -1)
        return print.error('Invalid type. See DigitalOcean API documentation for details.')
      if (name === 'null' && (type !== 'NS' && type !== 'MX'))
        return print.error('You must specify a name with A, AAAA, CNAME, TXT & SRV records.')
      if (data === 'null')
        return print.error('Data argument must be specified.')
      if ((type === 'MX' || type === 'SRV') && priority === 'null')
        return print.error('Priority must be specified for MX and SRV records.')
      if (type === 'SRV' && port === 'null')
        return print.error('Port must be specified in SRV records.')
      if (type === 'SRV' && weight === 'null')
        return print.error('Weight must be specified in SRV records.')

      if (name === 'null') name = null
      if (priority === 'null') priority = null
      if (port === 'null') port = null
      if (weight === 'null') weight = null

      api.create_record(domain, type, name, data, priority, port, weight, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Domain record created.')
      })
    }
  )
}

module.exports = domains
