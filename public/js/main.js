// home page component
let index = {
    data: function(){
        return {
            firstName: '',
        }
    },
    computed: {
        isLoggedIn: function(){
            console.log(mainVm && mainVm.isLoggedIn);
            return mainVm && mainVm.isLoggedIn
        }
    },
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
            <h1>Welcome to My Vinyl Site!</h1>
        </div>
        <div class="row text-center">
            <div class="col-md-4">
                <router-link to="/add-lp"><img src="/images/lp-browsing-400.jpg" class="img-responsive img-circle"></router-link>
                <br>
                <h4>Input and track your LP collection</h4>
            </div>
            <div class="col-md-4">
                <router-link to="/collection"><img src="/images/lp-surface-400.jpg" class="img-responsive img-circle"></router-link>
                <br>
                <h4>Find out how much your collection is worth</h4>
            </div>
            <div class="col-md-4">
                <router-link to="/profile"><img src="/images/yellow-cartridge-400.jpg" class="img-responsive img-circle"></router-link>
                <br>
                <h4>Check your collection metrics</h4>
            </div>
        </div>
        <br>
        <div class="text-center">
            <div v-if="!isLoggedIn" class="row text-center login-buttons-row" id="home-page-login-buttons">
                <!-- Signup modal button start  -->
                <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#signupModal">Sign Up</button>
                <!-- Signup modal button end  -->
                <!-- Login modal button start  -->
                <button type="button" class="btn btn-primary btn-md" data-toggle="modal" data-target="#loginModal">Login</button>
                <!-- Login modal button end  -->
            </div>
            <div v-else>
                <b>Welcome {{firstName}}</b>!&nbsp;&nbsp; <a href="/logout"><button class="btn btn-danger btn-sm logout-button">Logout</button></a>
            </div>
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
        <div class="row text-center profile-buttons-row">
            <router-link to="/add-lp"><button type="button" class="btn btn-success btn-md">Add LP</button></router-link>
            <router-link to="/collection"><button type="button" class="btn btn-primary btn-md">View Collection</button></router-link>
        </div>
        <hr>
        <!-- CHARTS AREA START -->
        <div class="row text-center">
            <div class="col-md-6">
                <canvas id="decades-pie-chart" width="800" height="450"></canvas>
            </div>
            <div class="col-md-6">
                <canvas id="genres-pie-chart" width="800" height="450"></canvas>
            </div>
        </div>
        <br><br>
        <div class="row text-center">
            <div class="col-md-6">
                <canvas id="lowest-price-pie-chart" width="800" height="450"></canvas>
            </div>
            <div class="col-md-6">
                <canvas id="purchase-price-pie-chart" width="800" height="450"></canvas>
            </div>
        </div>
        <!-- CHARTS AREA END -->
        <hr>
        <div class="row text-center">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <h3>Name: {{firstName}} {{lastName}}</h3>
                <h3>Favorite Artist: {{favoriteArtist}}</h3>
                <h3>Desert Island LPs:</h3>
                <h4><em>{{desertIslandLP1}}</em></h4>
                <h4><em>{{desertIslandLP2}}</em></h4>
                <h4><em>{{desertIslandLP3}}</em></h4>
            </div>
            <div class="col-md-2"></div>
        </div>
        <br><br>
        <div class="row text-center">
            <div class="col-md-4">
                <img src="/images/lps-on-shelf-400.jpg" class="img-responsive img-circle">
            </div>
            <div class="col-md-4">
                <img src="/images/red-45-400.jpg" class="img-responsive img-circle">
            </div>
            <div class="col-md-4">
                <img src="/images/black-turntable-400.jpg" class="img-responsive img-circle">
            </div>
        </div>
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
            profitLoss: '',
            releaseID: '',
        }
    },
    created : function(){
        $.get('/me', (dataFromServer) => {
            console.log('data from server',dataFromServer)
            this.firstName = dataFromServer.firstName
            console.log('this from /me',this)
        })

        $.get('/me-lps', (dataFromServer) => {
            console.log('data from server',dataFromServer)
            for (let i = 0; i < dataFromServer.length; i++) {
                let lp = dataFromServer[i];
                $.get('/api/v1/discogs/byrelease?type=release&catalogNumber=' + lp.catalogNumber,
                (lpFromServer) => {
                    console.log('data from discogs api call',lpFromServer)
                    lp.lowest_price = lpFromServer.lowest_price
                    lp.profitLoss = +lp.lowest_price - +lp.purchasePrice
                    this.releaseID = lp.releaseID
                    console.log('this release id',this.releaseID);
                }).then(()=>{this.$forceUpdate()})
            }

            this.collection = dataFromServer

            console.log('this from /me-lps',this)
        })
    },
    methods: {
        deleteLP: function(event, id, index){
            console.log(id, 'lp release from dom!!!!!!!!!!!!!!!!!!!!!!!!')
            event.preventDefault()
            console.log('clicked on deleteLP submit')
            $.post('/removeLP', {id: id}, (dataFromServer) => {
                console.log('data from server',dataFromServer)
                console.log('this from /removeLP',this)
                this.collection.splice(index, 1);
            })
        },
        sortLPs: function (n) {
          var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
          table = document.getElementById("lp-collection-table");
          switching = true;
          //Set the sorting direction to ascending:
          dir = "asc";
          /*Make a loop that will continue until
          no switching has been done:*/
          while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.getElementsByTagName("TR");
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
              //start by saying there should be no switching:
              shouldSwitch = false;
              /*Get the two elements you want to compare,
              one from current row and one from the next:*/
              x = rows[i].getElementsByTagName("TD")[n];
              y = rows[i + 1].getElementsByTagName("TD")[n];
              /*check if the two rows should switch place,
              based on the direction, asc or desc:*/
              if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch= true;
                  break;
                }
              } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch= true;
                  break;
                }
              }
            }
            if (shouldSwitch) {
              /*If a switch has been marked, make the switch
              and mark that a switch has been done:*/
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
              //Each time a switch is done, increase this count by 1:
              switchcount ++;
            } else {
              /*If no switching has been done AND the direction is "asc",
              set the direction to "desc" and run the while loop again.*/
              if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
              }
            }
          }
        }
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
            <table class="table" id="lp-collection-table">
                <thead>
                    <tr>
                        <th v-on:click="sortLPs(0)">Lowest Price</th>
                        <th v-on:click="sortLPs(1)">Artist Name</th>
                        <th v-on:click="sortLPs(2)">Album Name</th>
                        <th v-on:click="sortLPs(3)">Album Year</th>
                        <th v-on:click="sortLPs(4)">Album Genre</th>
                        <th v-on:click="sortLPs(5)">Purchase Price</th>
                        <th v-on:click="sortLPs(6)">Profit/Loss</th>
                        <th v-on:click="sortLPs(7)">Cover Image</th>
                        <th v-on:click="sortLPs(8)">Release ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(lp, i) in collection">
                        <td>$ {{lp.lowest_price || 0}}</td>
                        <td>{{lp.artistName}}</td>
                        <td><em>{{lp.albumName}}</em></td>
                        <td>{{lp.albumYear}}</td>
                        <td>{{lp.albumGenre}}</td>
                        <td>$ {{lp.purchasePrice || 0}}</td>
                        <td>$ {{lp.profitLoss || 0}}</td>
                        <td><img v-bind:src="lp.lpImage" class="img-responsive table-img-center"></td>
                        <td>{{lp.releaseID}}</td>
                        <button type="submit" class="btn btn-danger btn-xs delete-item" v-on:click="deleteLP($event, lp.releaseID, i)">X</button>
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
            releaseID: '',
            validator: validator,
            _id: '',
            successBoxIsVisible: false,
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
                this.albumYear = dataFromServer.year || 'NA'
                this.albumGenre = dataFromServer.genres[0]
                this.album_notes = dataFromServer.notes
                this.releaseID = dataFromServer.id
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
                mediaCondition: this.mediaCondition || 'NA',
                sleeveCondition: this.sleeveCondition || 'NA',
                lowest_price: this.lowest_price,
                purchasePrice: this.purchasePrice || 0,
                profitLoss: +this.lowest_price - +this.purchasePrice,
                lpImage: this.lpImage,
                releaseID: this.releaseID
            }
            console.log(createLPInfo)
            $.post('/newLP', createLPInfo, (data) => {
                collection._id = data
                console.log('newlp data',collection._id);
                // pop up box showing user that lp was added successfully
                this.successBoxIsVisible = true
                setTimeout(() => {
                    this.successBoxIsVisible = false
                },2000)
                // refresh the page
                myRouter.push({ path: 'add-lp' })
                // clear out the input fields
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
                this.album_notes = ''
                this.lowest_price = ''
            })
        }
    },
    template:
    `
    <div class="container">

        <div class="row text-center">
            <h2>Add LP</h2>
            <h4>Search for your LP by Catalog Number</h4>
            <small>(Found on the cover, spine, or inner label, e.g. LPV-510)</small>
            <hr>
        </div>

        <div class="row">
            <form id="add-lp-form" v-on:submit="getDiscogsLP($event)">
                <div class="col-md-2"></div>
                <div class="col-md-5">
                    <input v-model="catalogNumber" type="text" class="catalogNumber form-control" placeholder="Catalog #" id="LPSearchBar">
                </div>
                <div class="col-md-3">
                    <button class="btn btn-danger btn-md form-control" type="submit">Search</button>
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
                <p><b>Lowest Price: $ {{lowest_price}}</b></p>
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
                <div v-if="!validator.isEmpty(purchasePrice) && !validator.isFloat(purchasePrice,{min:0})">
                    Please enter a valid value: e.g. 0, 1, or 1.75
                </div>
                <br>
                <button type="submit" class="form-control btn btn-success" v-on:click="createLP">
                    ADD LP TO COLLECTION
                </button>
                <br><br>
            </div>
            <div class="col-md-2"></div>
        </div>

        <div id="lp-added-success" v-if="successBoxIsVisible"><span class="lp-added-success-text">LP Added Successfully!</span></div>

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
                <p>~<a href="https:paulhumphrey.me" target="_blank">Paul Humphrey</a>, creator of myvinyl.site</p>
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
        releaseID: '',
    },
    router: myRouter,
    created : function(){
        console.log('CREATING')

        $.get('/me', (data) => {
            console.log('login data:',data)
            if (data.username) {
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
                if ( data.success ) {
                    this.isLoggedIn = true
                    myRouter.push({ path: 'collection' })

                }
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
                console.log('170918',data)
                myRouter.push({ path: 'collection' })
                this.isLoggedIn = true
                this.firstName = data.firstName
            })
        },
        // logout method
        // logout: function(event){
        //     event.preventDefault()
        //     console.log('clicked on logout-button submit')
        //     window.location.href = '/logout'
        // },
    }
})
