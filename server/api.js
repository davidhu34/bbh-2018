//const ensureLogin = require('connect-ensure-login')
const md5 = require('md5')
const { Router } = require('express')

const successLog = ( data ) => {
    console.log( 'on query success:\n', data )
}
const classes = ['MIN', 'SEA', 'NYY', 'CHC', 'TEX', 'LAD', 'BOS', 'CLE', 'PIT', 'STL', 'ATAT', 'BESPIN', 'hoth', 'kyber', 'bendu']
const passwords = {
    A: 'Apple',
    B: 'Banana',
    C: 'Cookie',
    D: 'Drink',
    E: 'Egg'
}
const checkPassword = (p, t, d) => {
    const day = d.getDate()
    const month = d.getMonth()+1
    const code = String(day+month)+String(day*month)
    console.log(day, month, code)
    return p.indexOf(passwords[t]) > -1
        && p.indexOf(code) > -1
}
let users = {}
let dateProgram = {}
for(let mm=0; mm<12; mm++){
    for (let dd=0; dd < 31; dd++){
        const day = String(mm+1)+String(dd+1)
        dateProgram[day] = {}
        classes.map( c => {
            dateProgram[day][c.toUpperCase()] = {}
        })
}}
dateProgram['test'] = {}
classes.map( c => {
    dateProgram['test'][c] = {}
})

let classProgram = {}
classes.map( c => {
    classProgram[c] = {}
})


module.exports = ( io, models ) => {
//    const authenticated = ensureLogin.ensureLoggedIn('/login')
    const router = Router()
    const { Program } = models
    Program.find({}, (err, programs) => {
        if (err) {
            console.log('server init data error', err)
        } else {
            programs.map( p => {
                const pData = JSON.parse(p.data)
                if(p.day){
                    console.log('program:',p.id,'hasday')
                    dateProgram[p.day][pData.Class.toUpperCase()][pData.team] = p
                }else{
                    console.log('program:',p.id,'noday')
                    dateProgram['test'][pData.Class.toUpperCase()][pData.team] = p
                }
            })
            console.log('all data got')
        }
    })
    const user = socket => {
        socket.on( 'LOGIN', login => {
            console.log('data req', login)
            const {team, password, date} = login
            const Class = login.Class.toUpperCase()
            const time = new Date(date)
            const validClass = classes.indexOf(Class) > -1
            const validPassword = checkPassword(password, team, time)
            const day = String(time.getMonth()+1)+String(time.getDate())
            const id = Class+team+day
            console.log('valid class',validClass,'valid pwd',validPassword)
            if (validClass && validPassword) {
                const profile = {
                    id: id,
                    team: team,
                    Class: Class,
                    day: day
                }
                users[socket.id] = profile
                //users[socket.id].socket = socket
                console.log(users[socket.id])
                socket.emit('LOGIN_SUCCESS', {
                    profile: profile
                })
                const pCache = dateProgram[day][profile.Class][profile.team]
                if (!pCache) {
                    console.log('new data for:', id)
                    const init = {
                        id: id,
                        team: team,
                        Class: Class,
                        day: day,
                        instructionOrder: [],
                        instructions: {}
                    }
                    Program.create({
                        id: id,
                        day: day,
                        data: JSON.stringify(init)
                    }, (err, p) => {
                        console.log('created for '+id)
                        socket.emit( 'PROGRAM_DATA', init)
                    })
                } else socket.emit( 'PROGRAM_DATA', JSON.parse(pCache.data))
                console.log('sending p data to', id)
                Object.keys(dateProgram[day][Class]).map( k => {
                    console.log('class ', k, 'to', id)
                    socket.emit('PROGRAM_DATA',
                        JSON.parse(dateProgram[day][Class][k].data)
                    )
                })
            } else {
                socket.emit('LOGIN_FAIL', {
                    Class: validClass,
                    password: validPassword
                })
            }
        })
        socket.on('SAVE_CHANGES', program => {
            if(!users[socket.id])
                users[socket.id] = {
                    id: program.id,
                    team: program.team,
                    Class: program.Class.toUpperCase(),
                    day: program.day
                }
            const u = users[socket.id]
            const newSave = {
                id: u.id,
                data: JSON.stringify(program)
            }
            dateProgram[u.day][u.Class][u.team] = newSave
            Program.update( {id: u.id},
                newSave,
                (err, n, res) => {
                    console.log('update cb:', err, n, res)
                    if (err) console.log('save fail')
                    else {
                        socket.emit('SAVE_SUCCESS', program)
                        //socket.broadcast.emit('PROGRAM_DATA', newSave.data)
                        Object.keys(users).map( id => {
                            console.log(users[id], program.day, program.Class)
                            if (users[id].day === program.day
                                && users[id].Class === program.Class) {
                                io.sockets.connected[id].emit('PROGRAM_DATA', program)
                            }
                        })
                        //Object.keys(users).map( id => {
                        //    io.sockets.socket(id).emit('PROGRAM_DATA', newSave.data)
                        //})
                    }
                }
            )
        })
        socket.on('disconnect',() => {
            delete users[socket.id]
        })

    }

    io.on('connection', socket => {
        console.log('connected:', socket.id)
        user(socket)
    })
    return router
}
