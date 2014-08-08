var api = require('digio-api')
, print = require('../print')
, tools = require('../tools')

var images = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'images',
    'delete',
    ['<id>'],
    'Delete an image',
    function (id) {
      api.images.delete(id, function(err, data) {
        if (err) return print.error(err.message)
        print.success('image deleted')
      })
    }
  )

  cmd.register(
    'images',
    'get',
    ['<id>'],
    'Retrieve information about an image by ID',
    function (id) {
      api.images.get(id, function (err, data) {
        if (err) return print.error(err.message)

        console.log('')
        console.log('- ID:            ' + data.image.id)
        console.log('    Name:        ' + data.image.name)
        console.log('    Distribution:' + data.image.distribution)
        console.log('    Slug:        ' + data.image.slug)
        console.log('    Public:      ' + data.image.public)
        console.log('    Regions:     ' + data.image.regions)
        console.log('    Actions:     ' + data.image.action_ids)
        console.log('    Created at:  ' + data.image.created_at)
        console.log('')
      })
    }
  )

  cmd.register(
    'images',
    'getaction',
    ['<image ID> <action ID>'],
    'Retrieve the status of an image action',
    function (image_id, action_id) {
      api.images.get(image_id, action_id, function (err, data) {
        if (err) return print.error(err.message)

        console.log('')
        console.log('- ID:            ' + data.action.id)
        console.log('    Status:      ' + data.action.status)
        console.log('    Type:        ' + data.action.type)
        console.log('    Started:     ' + data.action.started_at)
        console.log('    Completed:   ' + data.action.completed_at)
        console.log('    ResourceID:  ' + data.action.resource_id)
        console.log('    ResourceType:' + data.action.resource_type)
        console.log('    Region:      ' + data.action.region)
        console.log('')
      })
    }
  )

  cmd.register(
    'images',
    'list',
    [],
    'List all available images',
    function () {
      api.images.list(function (err, data) {
        if (err) return print.error(err.message)

        console.log('\nTotal images: ' + data.meta.total + '\n')
        data.images.forEach(function (image) {
          console.log('- Name:          ' + image.name)
          console.log('    ID:          ' + image.id)
          console.log('    Distribution:' + image.distribution)
          console.log('    Slug:        ' + image.slug)
          console.log('    Public:      ' + image.public)
          console.log('    Regions:     ' + image.regions)
          console.log('    Actions:     ' + image.action_ids)
          console.log('    Created at:  ' + image.created_at)
          console.log('')
        })

      })
    }
  )

  cmd.register(
    'images',
    'update',
    ['<id> <name>'],
    'Update an image',
    function (id, name) {
      api.images.get(id, function (err, data) {
        if (err) return print.error(err.message)

        console.log('')
        console.log('- ID:            ' + data.image.id)
        console.log('    Name:        ' + data.image.name)
        console.log('    Distribution:' + data.image.distribution)
        console.log('    Slug:        ' + data.image.slug)
        console.log('    Public:      ' + data.image.public)
        console.log('    Regions:     ' + data.image.regions)
        console.log('    Actions:     ' + data.image.action_ids)
        console.log('    Created at:  ' + data.image.created_at)
        console.log('')
      })
    }
  )

  cmd.register(
    'images',
    'transfer',
    ['<id> <region slug>'],
    'Transfer an image to another region',
    function (id, region, name) {
      api.images.get(id, region, function (err, data) {
        if (err) return print.error(err.message)

        console.log('')
        console.log('- ID:            ' + data.action.id)
        console.log('    Status:      ' + data.action.status)
        console.log('    Type:        ' + data.action.type)
        console.log('    Started:     ' + data.action.started_at)
        console.log('    Completed:   ' + data.action.completed_at)
        console.log('    ResourceID:  ' + data.action.resource_id)
        console.log('    ResourceType:' + data.action.resource_type)
        console.log('    Region:      ' + data.action.region)
        console.log('')
      })
    }
  )
}

module.exports = images
