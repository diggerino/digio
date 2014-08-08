var api = require('digio-api')
, print = require('../print')
, tools = require('../tools')

var droplets = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'droplets',
    'list',
    [],
    'List all droplets',
    function () {
      api.droplets.list(function (err, data) {
        if (err) return print.error(err.message)
        console.log('\nTotal droplets: ' + data.meta.total + '\n')
        data.droplets.forEach(function (droplet) {
          console.log('- Name:        ' + droplet.name)
          console.log('    ID:        ' + droplet.id)
          console.log('    Size:      ' + droplet.size.slug)
          console.log('    Image:     ' + droplet.image.name)
          console.log('')
        })
      })
    }
  )

  cmd.register(
    'droplets',
    'get',
    ['<id>'],
    'Get details of a specific droplet',
    function (id) {
      api.droplets.get(id, function (err, data) {
        if (err) return print.error(err.message)
        console.log('')
        console.log('- Name:        ' + data.droplet.name)
        console.log('    ID:        ' + data.droplet.id)
        console.log('    Memory:    ' + data.droplet.memory)
        console.log('    VCPUs:     ' + data.droplet.vcpus)
        console.log('    Disk:      ' + data.droplet.disk)
        console.log('    Region:    ' + data.droplet.region.name)
        console.log('    Image:     ' + data.droplet.image.name)
        console.log('    Kernel:    ')
        console.log('    - Name:    ' + data.droplet.kernel.name)
        console.log('    - Version: ' + data.droplet.kernel.version)
        console.log('    Size:      ' + data.droplet.size.slug)
        console.log('    Locked:    ' + data.droplet.locked)
        console.log('    Status:    ' + data.droplet.status)
        console.log('    Networks:  ')
        console.log('      V4:      ')
        data.droplet.networks.v4.forEach(function (v4) {
          console.log('      - ' + v4.ip_address)
        })
        console.log('      V6:      ')
        data.droplet.networks.v6.forEach(function (v6) {
          console.log('      - ' + v6.ip_address)
        })
        console.log('    Created:   ' + data.droplet.created_at)
        console.log('    Features:  ' + data.droplet.features.join())
        console.log('    Backups:   ' + data.droplet.backup_ids.join())
        console.log('    Snapshots: ' + data.droplet.snapshot_ids.join())
        console.log('    Actions:   ' + data.droplet.action_ids.join())
        console.log('')
      })
    }
  )

  cmd.register(
    'droplets',
    'delete',
    ['<id>'],
    'Delete a droplet',
    function (id) {
      api.droplets.delete(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Deleted droplet with ID: ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'create',
    ['<name>','<region>','<size>','<image>','<ssh_keys>','<backups>','<ipv6>','<priv_net>'],
    'Create a new droplet',
    function (name, region, size, image_id, ssh_keys, backups, ipv6, priv_net) {
      if (!isNaN(image_id)) image_id = Number(image_id)
      if (ssh_keys === 'null') ssh_keys = null
      if (backups === 'null') backups = null
      if (ipv6 === 'null') ipv6 = null
      if (priv_net === 'null') priv_net = null

      if (ssh_keys) {
        ssh_keys = ssh_keys.split(',')
        ssh_keys = ssh_keys.map(function (element) {
          if (!isNaN(element)) return Number(element)
          return element
        })
      }

      api.droplets.create(name, region, size, image_id, ssh_keys, backups, ipv6, priv_net, function (err, data) {
        if (err) print.error(err.message)
        print.success('Droplet ' + name + ' created!')
      })
    }
  )

  cmd.register(
    'droplets',
    'listactions',
    ['<id>'],
    'List last actions on a specific droplet',
    function (id) {
      api.droplets.list_actions(id, function (err, data) {
        if (err) return print.error(err.message)
        console.log('\nTotal actions: ' + data.meta.total + '\n')
        data.actions.forEach(function (a) {
          console.log('- ID:            ' + a.id)
          console.log('    Status:      ' + a.status)
          console.log('    Type:        ' + a.type)
          console.log('    Started:     ' + a.started_at)
          console.log('    Completed:   ' + a.completed_at)
          console.log('    ResourceID:  ' + a.resource_id)
          console.log('    ResourceType:' + a.resource_type)
          console.log('    Region:      ' + a.region)
          console.log('')
        })
      })
    }
  )

  cmd.register(
    'droplets',
    'listkernels',
    ['<id>'],
    'List all available kernels for a specific droplet',
    function (id) {
      api.droplets.list_kernels(id, function (err, data) {
        if (err) return print.error(err.message)
        console.log('\nTotal kernels: ' + data.meta.total)
        data.kernels.forEach(function (k) {
          console.log('- Name:        ' + k.name)
          console.log('    Version:   ' + k.version)
          console.log('    ID:        ' + k.id)
          console.log('')
        })
      })
    }
  )

  cmd.register(
    'droplets',
    'listbackups',
    ['<id>'],
    'List backups for a specific droplet',
    function (id) {
      api.droplets.list_backups(id, function (err, data) {
        if (err) return print.error(err.message)
        console.log('\nTotal backups: ' + data.meta.total)
        data.backups.forEach(function (b) {
          console.log('- Name:        ' + b.name)
          console.log('    ID:        ' + b.id)
          console.log('    Distro:    ' + b.distribution)
          console.log('    Slug:      ' + b.slug)
          console.log('    Public:    ' + b.public)
          console.log('    Regions:   ' + b.regions.join())
          console.log('    Actions:   ' + b.action_ids.join())
          console.log('')
        })
      })
    }
  )

  cmd.register(
    'droplets',
    'listsnapshots',
    ['<id>'],
    'List snapshots for a specific droplet',
    function (id) {
      api.droplets.list_backups(id, function (err, data) {
        if (err) return print.error(err.message)
        console.log('\nTotal snapshots: ' + data.meta.total)
        data.backups.forEach(function (s) {
          console.log('- Name:        ' + s.name)
          console.log('    ID:        ' + s.id)
          console.log('    Distro:    ' + s.distribution)
          console.log('    Slug:      ' + s.slug)
          console.log('    Public:    ' + s.public)
          console.log('    Regions:   ' + s.regions.join())
          console.log('    Actions:   ' + s.action_ids.join())
          console.log('')
        })
      })
    }
  )

  cmd.register(
    'droplets',
    'reboot',
    ['<id>'],
    'Reboot a specific droplet',
    function (id) {
      api.droplets.reboot(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Rebooted droplet ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'powercycle',
    ['<id>'],
    'Power cycle a specific droplet',
    function (id) {
      api.droplets.power_cycle(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Power cycled droplet ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'changekernel',
    ['<id>', '<kernel_id>'],
    'Change the kernel on a specific droplet',
    function (id, kernel_id) {
      api.droplets.change_kernel(id, kernel_id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Changed kernel on droplet ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'disablebackup',
    ['<id>'],
    'Turns off backups on a specific droplet',
    function (id) {
      api.droplets.disable_backups(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Backups turned off on droplet ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'enableipv6',
    ['<id>'],
    'Enable IPv6 on a specific droplet',
    function (id) {
      api.droplets.enable_ipv6(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('IPv6 enabled on droplet ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'enableprivnet',
    ['<id>'],
    'Enable private networking on a specific droplet',
    function (id) {
      api.droplets.enable_priv_net(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Private networking enabled on droplet ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'getaction',
    ['<id>', '<action_id>'],
    'See details of a specific droplet action',
    function (id, action_id) {
      api.droplets.get_droplet_action(id, action_id, function (err, data) {
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
    'droplets',
    'resetpassword',
    ['<id>'],
    'Reset the password on a specific droplet',
    function (id) {
      api.droplets.password_reset(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Password has been reset on droplet ' + id)
      })
    }
  )

  cmd.register(
    'droplets',
    'poweroff',
    ['<id>'],
    'Power off a specific droplet',
    function (id) {
      api.droplets.power_off(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Droplet ' + id + ' has been shut down.')
      })
    }
  )

  cmd.register(
    'droplets',
    'poweron',
    ['<id>'],
    'Power on a specific droplet',
    function (id) {
      api.droplets.power_on(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Droplet ' + id + ' has been turned on.')
      })
    }
  )


}

module.exports = droplets
