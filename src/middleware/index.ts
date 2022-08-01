import { any } from 'bluebird';
import { Application } from '../declarations';
// Don't remove this comment. It's needed to format import lines nicely.

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export default function (app: Application): void {


app.use('/verifyfob', (_req :any, res: any) => {
    app.service('users').find({query: _req.query}).then((r:any)=>{
        res.json({
            active: (r.total !== 0),
            user: (r.data.length >0 ? r.data[0].user: null)
        });
    });
});


app.use('/seed', (_req:any, res:any)=>{

    app.service('badge').create({name: '🤝 Member', 'definition': 'One of us'})

    app.service('badge').create({name: '💻 Contributooor', 'definition': 'Contributes to the Moonbase codebase', color: 'success'}).then((contributorBadge)=>{
        app.service('badge').create({name: '🎤 Speakooor', 'definition': 'Has given a talk at the space', color: 'info'}).then(speakorBadge => {
            app.service('users').create({
                username:'tristani',
                password:'yesser',
                twitter: 'Tani0x',
                telegram: 'Tani0x',
                fobId:42069,
                credits:1337,
                badges: [contributorBadge.id, speakorBadge.id]
                }).then((user)=>{
                    console.log(user)
                })
            })
        })
        
    app.service('badge').create({name: '⭐ Legend', 'definition': 'Has donated or significantly contributed to the space', color: 'secondary'})

    app.service('badge').create({name: '🐱‍👤 Helpooor', 'definition': 'Has helped the space', color: 'warning'})

    app.service('badge').create({name: '🧹 Cleanooor', 'definition': 'Maintains the space neat and tidy 🧼', color: 'warning'}).then((badge)=>{
        app.service('users').create({
            username:'david',
            password:'yesser',
            active: true,
            badges: [badge.id],
            fobId:133769,
            credits:25,
        })
    })

      app.service('organization').create({
        name: 'ETH Vancouver',
        telegramGroup: '',
        discord: 'https://discord.gg/bhXeFUp2DK',
        backgroundColor: '#5d638a',
        description: 'Vancouver\'s Ethereum community'
      })
      
      app.service('organization').create({
        name: 'DCTRL',
        telegramGroup: '',
        discord: 'https://discord.gg/8Wg6qVx6',
        backgroundColor: '#82531b',
        description: 'DCTRL Vancouver'
      })

      app.service('organization').create({
        name: 'YVR DAO',
        telegramGroup: '',
        discord: 'https://discord.gg/bvpNXkrkvD',
        backgroundColor: '#6447cc',
        description: 'YVR DAO'
      })




    app.service('users').create({
        username:'cam',
        password:'yesser',
        active: false,
        fobId:666,
        credits:0,
    })

    res.json({message: 'exectuted'})
});

interface IUserResponse  {
    id: number
    username: string
    ethaddress: string | null
    fobId: string | null
    alias: string | null
    password: string
    credits: number
    active: number
    monthsActive: number
    pfp: string
    createdAt: string
    updatedAt: string
}

app.use('/getpfp', (_req:any, res:any)=>{
    
    app.service('users').get(_req.query.id).then((u:IUserResponse)=>{
        const USERNAME = (u.username?.charAt(0).toUpperCase() + u.username.slice(1));
        
        const activeStyle = ` 
        <style>
            .base { fill: white; font-family: sans-serif; font-size: 24px; }
            .username { fill: #f2a900; font-size: 36px; font-weight: 600; font-family:  sans-serif}
            .credits { font-size: 14px; fill: white; font-family:  sans-serif}
        </style>
        `        
        const inactiveStyle = ` 
        <style>
            .base { fill: #B6B6B6 ; font-family: sans-serif; font-size: 18px; }
            .username { fill: #B6B6B6 ; font-size: 36px; font-weight: 600; font-family:  sans-serif}
            .credits { font-size: 14px; fill: #B6B6B6 ; font-family:  sans-serif}
        </style>
        `

        const RAW_SVG = `
        <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'>
        ${u.active > 0 ? activeStyle : inactiveStyle }
        <rect width='100%' height='100%' fill='#11182B' />
        <text x='50%' y='50%' class='username' dominant-baseline='middle' text-anchor='middle'>${USERNAME}</text>
        <text x='50%' y='20%' class='base' dominant-baseline='middle' text-anchor='middle'>${u.active > 0 ? 'Moonbase Member' : 'MoonBase Inactive Member'}</text>
        <text x='50%' y='80%' class='base' dominant-baseline='middle' text-anchor='middle'>Member since: 2021-09</text>
        <text x='50%' y='93%' class='credits' dominant-baseline='middle' text-anchor='middle'>${u.credits} credits</text>
        </svg>
    `
        const buff =  Buffer.from(RAW_SVG);
        const base64data = buff.toString('base64');
        const HTML_FORMATTED_SVG = 'data:image/svg+xml;base64,' + base64data
        // res.sendFile(RAW_SVG)
        // res.json(HTML_FORMATTED_SVG)
        res.header("Content-Type","image/svg+xml");
        // res.header("Cross-Origin-Opener-Policy", "unsafe-none")
        res.header("Access-Control-Allow-Origin", "*")
        res.send(RAW_SVG)
    }).catch(e=>console.log(e))

})


app.use('/getnftdata', (_req:any, res:any)=>{
    
    app.service('users').get(_req.query.id).then((u:IUserResponse)=>{

        const USERNAME = (u.username?.charAt(0).toUpperCase() + u.username.slice(1));
        
        const NFT_DATA  = {
            name: `Moonbase member: ${USERNAME}`,
            description: `Moonbase membership card`,
            image: `https://api.moonbase.vip/getpfp?id=${_req.query.id}`
        }
        res.header("Access-Control-Allow-Origin", "*")
        res.json(NFT_DATA)
    }).catch(e=>console.log(e))

})

app.use('/buypop', (_req :any, res: any) => {

    const POP_COST = 1

    app.service('users').get(1).then((r:any)=>{

        if(r.credits > POP_COST){

            app.service('users').patch(1, {credits: r.credits - POP_COST}).then((p:any)=>{
                console.log(p.credits)
                res.json({
                    message: `Enjoy the cold drink, you have been debited ${POP_COST} credit${POP_COST > 1? 's' : ''}`,
                    credits: (p.credits)
                });
            })
            
        } else { 

            res.json({
                message: `Not enough credits. you need a minimum of ${POP_COST} credit${POP_COST > 1? 's' : ''}`,
                credits: (r.credits)
            })

        }

        
    });
});

}
