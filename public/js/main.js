// CHART CODE
// new Chart(document.getElementById("line-chart-today"), {
//   type: 'line',
//   data: {
//     labels: ['1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 AM'],
//     datasets: [{
//         data: [0,0,0,0,0,0,395,0,0,0,0,512,0,0,80,120,666,0,0,100,0,0,0,0],
//         label: "Calories Ingested",
//         borderColor: "green",
//         fill: true,
//       }, {
//         data: [0,0,0,0,0,100,-50,0,0,50,0,100,50,0,50,50,100,0,0,100,0,0,0,0],
//         label: "Mood",
//         borderColor: "blue",
//         fill: true,
//       }, {
//         data: [0,0,0,0,0,-300,0,0,0,-100,0,0,-100,0,0,0,0,0,0,-650,0,0,0,0],
//         label: "Calories Burned",
//         borderColor: "red",
//         fill: true,
//       },
//     ]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'Calories Ingested, Calories Burned, and Mood: Daily'
//     }
//   }
// });

// home page component
let index = {
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h1>Welcome to My Vinyl Site!</h1>
            <h4>Input and track your LP collection...</h4>
            <h4>Find out how much your collection is truly worth...</h4>
            <h4>Check out some snazzy graphs about your collection...</h4>
        </div>
        <br>
        <div class="row text-center login-buttons-row" id="home-page-login-buttons">
            <!-- Signup modal button start  -->
            <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#signupModal">Sign Up</button>
            <!-- Signup modal button end  -->
            <!-- Login modal button start  -->
            <button type="button" class="btn btn-primary btn-md" data-toggle="modal" data-target="#loginModal">Login</button>
            <!-- Login modal button end  -->
        </div>
    </div>
    `
}

// profile page component
let profile = {
    data: function(){
        return {
            username: '',
            firstName: '',
            lastName: '',
            favoriteArtist: '',
            desertIslandLP1: '',
            desertIslandLP2: '',
            desertIslandLP3: '',
        }
    },
    created : function(){
        $.get('/me', (dataFromServer) => {
            console.log(this)
            console.log('data from server',dataFromServer)
            this.username = dataFromServer.username
            this.firstName = dataFromServer.firstName
            this.lastName = dataFromServer.lastName
            this.favoriteArtist = dataFromServer.favoriteArtist
            this.desertIslandLP1 = dataFromServer.desertIslandLP1
            this.desertIslandLP2 = dataFromServer.desertIslandLP2
            this.desertIslandLP3 = dataFromServer.desertIslandLP3
        })
    },
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>{{firstName}}'s Profile</h2>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-8">
                <h3>Name: {{firstName}} {{lastName}}</h3>
                <h3>Favorite Artist: {{favoriteArtist}}<h3>
                <h3>Desert Island LPs:<h3>
                    <h4><ol>
                        <li><em>{{desertIslandLP1}}</em></li>
                        <li><em>{{desertIslandLP2}}</em></li>
                        <li><em>{{desertIslandLP3}}</em></li>
                    </ol></h4>
            </div>
            <div class="col-md-4">
                <img src="http://lorempixel.com/300/300/abstract" class="img-responsive img-circle">
            </div>
        </div>
        <br>
        <div class="row text-center profile-buttons-row">
            <router-link to="/add-lp"><button type="button" class="btn btn-success btn-md">Add LP</button></router-link>
            <router-link to="/collection"><button type="button" class="btn btn-primary btn-md">View Collection</button></router-link>
        </div>
        <!-- CHARTS AREA START - WHY ISN'T THIS LOADING??? -->
        <canvas id="genre-chart"></canvas>
        <!-- CHARTS AREA END -->
    </div>
    `
}

// collection page component
let collection = {
    data: function(){
        return {
            firstName: '',
            artistName: '',
            albumName: '',
            albumYear: '',
            albumGenre: '',
            purchasePrice: '',
            lowest_price: '',
            collection: [],
            lpImage: '',
        }
    },
    // DO I NEED ANOTHER .get to something like ('/lp-collection') to grab all needed data for the collection table???
    created : function(){
        $.get('/me', (dataFromServer) => {
            console.log(this)
            console.log('data from server',dataFromServer)
            this.firstName = dataFromServer.firstName
        })
    },
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>{{firstName}}'s Collection</h2>
        </div>
        <hr>
        <div class="row text-center profile-buttons-row">
            <router-link to="/add-lp"><button type="button" class="btn btn-success btn-md">Add LP</button></router-link>
        </div>
        <hr>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Artist Name</th>
                        <th>Album Name</th>
                        <th>Lowest Price</th>
                        <th>Album Year</th>
                        <th>Album Genre</th>
                        <th>Purchase Price</th>
                        <th>Profit/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="http://lorempixel.com/100/100/technics" class="img-responsive table-img-center"></td>
                        <td>The Beatles</td>
                        <td><em>Revolver</em></td>
                        <td>$9.99</td>
                        <td>1966</td>
                        <td>Rock</td>
                        <td>$7.99</td>
                        <td>+$2.00</td>
                    </tr>
                    <tr>
                        <td><img src="http://lorempixel.com/100/100/abstract" class="img-responsive table-img-center"></td>
                        <td>The Beatles</td>
                        <td><em>Rubber Soul</em></td>
                        <td>$5.99</td>
                        <td>1965</td>
                        <td>Rock</td>
                        <td>$7.99</td>
                        <td>-$2.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
}

// add LP page component
let addLP = {
    data: function(){
        return {
            catalogNumber: '',
            artistName: '',
            albumName: '',
            albumYear: '',
            albumGenre: '',
            mediaCondition: '',
            sleeveCondition: '',
            purchasePrice: '',
            lowest_price: '',
            collection: [],
            lpImage: '',
            album_notes: '',
            albumLabel: '',
        }
    },
    created: function(){
        $.get('/me', (dataFromServer) => {
            console.log(this)
            console.log('data from server',dataFromServer)
            this.username = dataFromServer.username
        })
    },
    methods: {
        // search discogs api via catalog number
        getDiscogsLP: function(event){
            event.preventDefault()
            console.log('this',this)
            console.log('this catalog number',this.catalogNumber);
            $.get('/api/v1/discogs/byrelease?type=release&catalogNumber=' + this.catalogNumber,
            (dataFromServer) => {
                console.log('data from discogs api call',dataFromServer)
                this.lpImage = dataFromServer.thumb
                this.lowest_price = dataFromServer.lowest_price || 0
                this.artistName = dataFromServer.artists[0].name
                this.albumName = dataFromServer.title
                this.albumLabel = dataFromServer.labels[0].name
                this.catalogNumber = dataFromServer.labels[0].catno
                this.albumYear = dataFromServer.year
                this.albumGenre = dataFromServer.genres[0]
                this.album_notes = dataFromServer.notes
            })
        },
        // add an LP to the collection method
        createLP: function(event){
            event.preventDefault()
            console.log('clicked on create lp button submit')
            var createLPInfo = {
                catalogNumber: this.catalogNumber,
                artistName: this.artistName,
                albumName: this.albumName,
                albumYear: this.albumYear,
                albumGenre: this.albumGenre,
                mediaCondition: this.mediaCondition || '',
                sleeveCondition: this.sleeveCondition || '',
                lowest_price: this.lowest_price,
                purchasePrice: this.purchasePrice,
                profitLoss: +this.lowest_price - +this.purchasePrice
            }
            console.log(createLPInfo)
            $.post('/newLP', createLPInfo, (data) => {
                myRouter.push({ path: 'add-lp' })
                this.catalogNumber = ''
                this.artistName = ''
                this.albumName = ''
                this.albumYear = ''
                this.albumGenre = ''
                this.albumLabel = ''
                this.mediaCondition = ''
                this.sleeveCondition = ''
                this.purchasePrice = ''
                this.lpImage = ''
            })
        }
    },
    template:
    `
    <div class="container">

        <div class="row text-center">
            <hr>
            <h2>Add LP</h2>
            <h4>Lookup your LP by Album Name and/or Catalog Number</h4>
            <small>(Catalog # found on the cover, spine, or inner label)</small>
            <hr>
        </div>

        <div class="row">
            <form id="add-lp-form" v-on:submit="getDiscogsLP($event)">
                <div class="col-md-2"></div>
                <div class="col-md-5">
                    <input v-model="catalogNumber" type="text" class="catalogNumber form-control" placeholder="Album Name and/or Catalog #" id="LPSearchBar">
                </div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-danger btn-md form-control" type="submit">Search!</button>
                </div>
            </form>
        </div>

        <br>

        <!-- LP search results go here -->
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <img v-bind:src="lpImage" class="img-responsive lpImage">
            </div>
            <div class="col-md-6">
                <p>Artist Name: {{artistName}}</p>
                <p>Album Name: {{albumName}}</p>
                <p>Album Year: {{albumYear}}</p>
                <p>Album Genre: {{albumGenre}}</p>
                <p>Album Label: {{albumLabel}}</p>
                <p>Catalog #: {{catalogNumber}}</p>
                <p>Release Notes: {{album_notes}}</p>
                <p><b>Lowest Price: {{lowest_price}}</b></p>
            </div>
            <div class="col-md-2"></div>
        </div>

        <hr>

        <div class="row text-center">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <h4>If this matches your LP:</h4>
                <h3>What is the condition of the media?</h3>
                <select class="form-control" v-model="mediaCondition">
                    <option value="" selected disabled>Choose Condition</option>
                    <option>Mint (M)</option>
                    <option>Near Mint (NM or M-)</option>
                    <option>Very Good Plus (VG+)</option>
                    <option>Very Good (VG)</option>
                    <option>Good Plus (G+)</option>
                    <option>Good (G)</option>
                    <option>Fair (F)</option>
                    <option>Poor (P)</option>
                </select>
                <h3>What is the condition of the sleeve?</h3>
                <select class="form-control" v-model="sleeveCondition">
                    <option value="" selected disabled>Choose Condition</option>
                    <option>Mint (M)</option>
                    <option>Near Mint (NM or M-)</option>
                    <option>Very Good Plus (VG+)</option>
                    <option>Very Good (VG)</option>
                    <option>Good Plus (G+)</option>
                    <option>Good (G)</option>
                    <option>Fair (F)</option>
                    <option>Poor (P)</option>
                    <option>Generic</option>
                    <option>No Cover</option>
                </select>
                <small><a href="http://www.recordcollectorsguild.org/modules.php?op=modload&name=Sections&file=index&req=viewarticle&artid=17&page=1" target="_blank">Click here to read about condition grading guidelines</a>.</small>
                <h3>Purchase Price?</h3>
                <input type="text" class="form-control" placeholder="for example, 0, 1, or 1.75" v-model="purchasePrice">
                <div v-if="!validator.isEmpty(purchasePrice) && !validator.isFloat(purchasePrice,{min:0})">Please enter a valid value: e.g. 0, 1, or 1.75</div>
                <br>
                <button type="submit" class="form-control btn btn-success" v-on:click="createLP">
                    ADD LP TO COLLECTION
                </button>
                <br><br>
            </div>
            <div class="col-md-2"></div>
        </div>

    </div>
    `
}

// about page component
let about = {
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>About</h2>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-4">
                <img src="/images/paul-headshot-300.png" class="img-responsive img-circle">
            </div>
            <div class="col-md-8">
                <b><p>I created this site to allow lovers of vinyl LPs an easy way to catalog their collection and keep track of its current lowest price, so you can see what buyers are willing to pay at a bare minimum.</p>
                <p>Please feel free to <a href="mailto:paul@longmontcomputer.com?subject=Feedback from myvinyl.site">email me</a> with any comments or suggestions. I welcome your feedback!</p></b>
                <p>~Paul Humphrey, creator of myvinyl.site</p>
                <p><i>Nothing sounds like vinyl.</i></p>
            </div>
        </div>
    </div>
    `
}

// resources page component
let resources = {
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>Resources</h2>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-4">
                <a href="https://www.amazon.com/Audio-Technica-AT6011-Anti-Static-Record-Brush/dp/B01GE1ZOPY/ref=sr_1_2?ie=UTF8&qid=1505246780&sr=8-2&keywords=lp+anti+static+brush" target="_blank"><img src="/images/anti-static-brush-300.jpg" class="img-responsive"></a>
                <p><a href="https://www.amazon.com/Audio-Technica-AT6011-Anti-Static-Record-Brush/dp/B01GE1ZOPY/ref=sr_1_2?ie=UTF8&qid=1505246780&sr=8-2&keywords=lp+anti+static+brush" target="_blank">Anti-Static Brush</a>. Removes harmful dust and contaminants from your vinyl records.</p>
            </div>
            <div class="col-md-4">
                <a href="https://www.amazon.com/Pratt-PRA0821-Vinyl-Record-Mailer/dp/B00N41JJZE/ref=sr_1_1?rps=1&ie=UTF8&qid=1505245871&sr=8-1&keywords=lp+shipping+boxes&refinements=p_85%3A2470955011" target="_blank"><img src="/images/lp-shipping-box-300.jpg" class="img-responsive"></a>
                <p><a href="https://www.amazon.com/Pratt-PRA0821-Vinyl-Record-Mailer/dp/B00N41JJZE/ref=sr_1_1?rps=1&ie=UTF8&qid=1505245871&sr=8-1&keywords=lp+shipping+boxes&refinements=p_85%3A2470955011" target="_blank">LP Shipping Boxes</a>. Custom quality to ensure your LPs arrive in style.</p>
            </div>
            <div class="col-md-4">
                <a href="https://www.amazon.com/Mobile-Fidelity-Record-Inner-Sleeves/dp/B001LQSFKY/ref=sr_1_3?ie=UTF8&qid=1505246358&sr=8-3&keywords=lp+sleeves" target="_blank"><img src="/images/audiophile-sleeves-300.jpg" class="img-responsive"></a>
                <p><a href="https://www.amazon.com/Mobile-Fidelity-Record-Inner-Sleeves/dp/B001LQSFKY/ref=sr_1_3?ie=UTF8&qid=1505246358&sr=8-3&keywords=lp+sleeves" target="_blank">Inner Sleeves</a>. Audiophile quality to protect your most valuable media.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <a href="https://www.amazon.com/RPM-Record-Sleeves-100-Count/dp/B003NG2WIG/ref=sr_1_4?ie=UTF8&qid=1505246481&sr=8-4&keywords=lp+sleeves" target="_blank"><img src="/images/jacket-sleeves-300.jpg" class="img-responsive"></a>
                <p><a href="https://www.amazon.com/RPM-Record-Sleeves-100-Count/dp/B003NG2WIG/ref=sr_1_4?ie=UTF8&qid=1505246481&sr=8-4&keywords=lp+sleeves" target="_blank">Jacket Sleeves</a>. High quality outer sleeves to protect your LP jackets.</p>
            </div>
            <div class="col-md-4">
                <a href="https://www.amazon.com/SPIN-CLEAN-STARTER-RECORD-WASHER-SYSTEM/dp/B002UKSZUU/ref=sr_1_2?ie=UTF8&qid=1505246663&sr=8-2&keywords=lp+washer" target="_blank"><img src="/images/lp-washer-300.jpg" class="img-responsive"></a>
                <p><a href="https://www.amazon.com/SPIN-CLEAN-STARTER-RECORD-WASHER-SYSTEM/dp/B002UKSZUU/ref=sr_1_2?ie=UTF8&qid=1505246663&sr=8-2&keywords=lp+washer" target="_blank">LP Washer</a>. Clean the dirt, dust, and grime off of your vintage vinyl.</p>
            </div>
            <div class="col-md-4">
                <a href="http://www.needledoctor.com/" target="_blank"><img src="/images/needle-doctor-300.jpg" class="img-responsive"></a>
                <p><a href="http://www.needledoctor.com/" target="_blank">Needle Doctor</a>. Great website for buying turntables, cartridges, phono pre-amps, or anything vinyl!</p>
            </div>
        </div>
    </div>
    `
}

// 404 page component
let fourohfour = {
    template:
    `
    <div class="text-center fourohfour">
        <h1>404</h1>
        <br>
        <img src="/images/twilight-zone.jpg" class="responsive">
        <br><br>
        <h4><em>It is a dimension as vast as space and as timeless as infinity.<br>It is the middle ground between light and shadow,<br>between science and superstition,<br>and it lies between the pit of man's fears and the summit of his knowledge.<br>This is the dimension of imagination.<br>It is an area which we call the Twilight Zone.</em></h4>
    </div>
    `
}

// Vue router routes
var myRouter = new VueRouter({
    routes: [
        {
            path: '/',
            component: index,
        },
        {
            path: '/profile',
            component: profile,
        },
        {
            path: '/collection',
            component: collection,
        },
        {
            path: '/add-lp',
            component: addLP,
        },
        {
            path: '/about',
            component: about,
        },
        {
            path: '/resources',
            component: resources,
        },
        {
            path: '*',
            component: fourohfour,
        },
    ]
})

// Vue app
var mainVm = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        favoriteArtist: '',
        desertIslandLP1: '',
        desertIslandLP2: '',
        desertIslandLP3: '',
        catalogNumber: '',
        artistName: '',
        albumName: '',
        albumYear: '',
        albumGenre: '',
        mediaCondition: '',
        sleeveCondition: '',
        purchasePrice: '',
        lowest_price: '',
        collection: [],
        isLoggedIn: false,
        album_notes: '',
        albumLabel: '',
    },
    router: myRouter,
    created : function(){
        console.log('CREATING')

        $.post('/login', (data) => {
            console.log('login data:',data)
            if (Object.keys(data).length) {
                console.log('sdfnwrwrdmmfdb',this)
                myRouter.push({ path: 'collection' })
                this.isLoggedIn = true
                this.firstName = data.firstName
            } else {
                console.log('something is wrong with login');
            }
        })
    },
    methods: {
        // signup method
        signup: function(event){
            event.preventDefault()
            console.log('clicked on signup-form submit')
            var signupInfo = {
                username: this.username,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                favoriteArtist: this.favoriteArtist,
                desertIslandLP1: this.desertIslandLP1,
                desertIslandLP2: this.desertIslandLP2,
                desertIslandLP3: this.desertIslandLP3,
            }
            console.log(signupInfo)
            $.post('/signup', signupInfo, (data) => {
                myRouter.push({ path: 'collection' })
            })
        },
        // login method
        login: function(event){
            event.preventDefault()
            console.log('clicked on login-form submit')
            var loginInfo = {
                username : this.username,
                password : this.password,
            }
            $.post('/login', loginInfo, (data) => {
                console.log(data)
                myRouter.push({ path: 'collection' })
                this.isLoggedIn = true
                this.firstName = data.firstName
            })
        },
        // logout method
        logout: function(event){
            event.preventDefault()
            console.log('clicked on logout-button submit')
            $.post('/logout')
        },
    }
})
