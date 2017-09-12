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
        <div class="row text-center login-buttons-row">
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

let myProfile = {
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>My Profile</h2>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-7">
                <h3>Name: first... last...</h3>
                <h3>Email: email...</h3>
                <h3>Desert Island LPs:<h3>
                    <h4><ol>
                        <li>#1...</li>
                        <li>#2...</li>
                        <li>#3...</li>
                    </ol></h4>
            </div>
            <div class="col-md-3">
                <img src="http://lorempixel.com/300/300" class="img-responsive">
            </div>
            <div class="col-md-1"></div>
        </div>
        <br>
        <div class="row text-center profile-buttons-row">
            <router-link to="/add-lp"><button type="button" class="btn btn-success btn-md">Add LP</button></router-link>
            <router-link to="/my-collection"><button type="button" class="btn btn-primary btn-md">View Collection</button></router-link>
        </div>
    </div>
    `
}

let myCollection = {
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>My Collection</h2>
        </div>
        <hr>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Artist Name</th>
                        <th>Album Name</th>
                        <th>Current Value</th>
                        <th>Album Year</th>
                        <th>Album Genre</th>
                        <th>Catalog #</th>
                        <th>Purchase Price</th>
                        <th>Profit/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="http://lorempixel.com/100/100" class="img-responsive table-img-center"></td>
                        <td>The Beatles</td>
                        <td>Revolver</td>
                        <td>$9.99</td>
                        <td>1966</td>
                        <td>Rock</td>
                        <td>LSD-666</td>
                        <td>$7.99</td>
                        <td>+$2.99</td>
                    </tr>
                    <tr>
                        <td><img src="http://lorempixel.com/100/100" class="img-responsive table-img-center"></td>
                        <td>The Beatles</td>
                        <td>Revolver</td>
                        <td>$9.99</td>
                        <td>1966</td>
                        <td>Rock</td>
                        <td>LSD-666</td>
                        <td>$7.99</td>
                        <td>+$2.99</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- TODAY'S LINE GRAPH AREA START -->
        <canvas id="line-chart-today"></canvas>
        <!-- TODAY'S LINE GRAPH AREA END -->
    </div>
    `
}

let addLP = {
    template:
    `
    <div class="container">

        <div class="row text-center">
            <hr>
            <h2>Add LP</h2>
            <h4>Lookup your LP by Catalog Number</h4>
            <small>(Found on the cover, spine, or inner label)</small>
            <hr>
        </div>

        <div class="row">
            <form id="add-lp-form">
                <div class="col-md-2"></div>
                <div class="col-md-5">
                    <input type="text" class="catalogNumber form-control" placeholder="Catalog #">
                </div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-danger btn-md form-control" type="submit">Submit!</button>
                </div>
                <div class="col-md-2"></div>
            </form>
        </div>

        <br>

        <!-- search results go here -->
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <img src="http://lorempixel.com/200/200" class="img-responsive">
            </div>
            <div class="col-md-6">
                <p>Artist Name: artist name...</p>
                <p>Album Name: album name...</p>
                <p>Catalog #: catalog #...</p>
                <p>Album Year: album year...</p>
                <p>Album Genre: genre...</p>
            </div>
            <div class="col-md-2"></div>
        </div>

        <hr>

        <div class="row text-center">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <h4>If this matches your LP:</h4>
                <h3>What is the condition of the media?</h3>
                <!-- need to add v-model="mediaCondition" -->
                <select class="form-control">
                    <option>Mint (M)</option>
                    <option>Near Mint (NM or M-)</option>
                    <option>Very Good Plus (VG+)</option>
                    <option>Very Good (VG)</option>
                    <option>Good Plus (G+)</option>
                    <option>Good (G)</option>
                    <option>Fair (F)</option>
                    <option>Poor (P)</option>
                </select>
                <h3>What is the condition of the media?</h3>
                <!-- need to add v-model="sleeveCondition" -->
                <select class="form-control">
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
                <h3>Purchase Price?</h3>
                <!-- need to add v-model="purchasePrice" -->
                <input type="text" class="form-control" placeholder="$?">
                <br><br>
                <button type="submit" class="form-control btn btn-success">
                    ADD LP TO COLLECTION
                </button>
                <br><br>
            </div>
            <div class="col-md-2"></div>
        </div>

    </div>
    `
}

let about = {
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>About</h2>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <img src="/images/paul-headshot-300.png" class="img-responsive img-circle">
            </div>
            <div class="col-md-6">
                <b><p>I created this site to allow lovers of vinyl LPs an easy way to catalog their collection and keep track of its current market value.</p>
                <p>Please feel free to <a href="mailto:paul@longmontcomputer.com?subject=Feedback from myvinyl.site">email me</a> with any comments or suggestions. I welcome your feedback!</p></b>
                <p>~Paul Humphrey, creator of myvinyl.site</p>
                <p><i>Nothing sounds like vinyl.</i></p>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
    `
}

let resources = {
    template:
    `
    <div class="container">
        <div class="row text-center">
            <h2>Resources</h2>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <a href="https://www.amazon.com/Audio-Technica-AT6011-Anti-Static-Record-Brush/dp/B01GE1ZOPY/ref=sr_1_2?ie=UTF8&qid=1505246780&sr=8-2&keywords=lp+anti+static+brush" target="_blank"><img src="https://images-na.ssl-images-amazon.com/images/I/71eOD94EhTL._SL1500_.jpg" class="img-responsive"></a>
            </div>
            <div class="col-md-6">
                <b><a href="https://www.amazon.com/Audio-Technica-AT6011-Anti-Static-Record-Brush/dp/B01GE1ZOPY/ref=sr_1_2?ie=UTF8&qid=1505246780&sr=8-2&keywords=lp+anti+static+brush" target="_blank">Anti-Static Brush</a>. Removes harmful dust and contaminants from your vinyl records.</p>
            </div>
            <div class="col-md-2"></div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <a href="https://www.amazon.com/Pratt-PRA0821-Vinyl-Record-Mailer/dp/B00N41JJZE/ref=sr_1_1?rps=1&ie=UTF8&qid=1505245871&sr=8-1&keywords=lp+shipping+boxes&refinements=p_85%3A2470955011" target="_blank"><img src="https://images-na.ssl-images-amazon.com/images/I/51VOXGBM-IL._SL1000_.jpg" class="img-responsive"></a>
            </div>
            <div class="col-md-6">
                <b><a href="https://www.amazon.com/Pratt-PRA0821-Vinyl-Record-Mailer/dp/B00N41JJZE/ref=sr_1_1?rps=1&ie=UTF8&qid=1505245871&sr=8-1&keywords=lp+shipping+boxes&refinements=p_85%3A2470955011" target="_blank">LP Shipping Boxes</a>. Custom quality to ensure your LPs arrive in style.</p>
            </div>
            <div class="col-md-2"></div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <a href="https://www.amazon.com/Mobile-Fidelity-Record-Inner-Sleeves/dp/B001LQSFKY/ref=sr_1_3?ie=UTF8&qid=1505246358&sr=8-3&keywords=lp+sleeves" target="_blank"><img src="https://images-na.ssl-images-amazon.com/images/I/51-TIzP4gvL.jpg" class="img-responsive"></a>
            </div>
            <div class="col-md-6">
                <b><a href="https://www.amazon.com/Mobile-Fidelity-Record-Inner-Sleeves/dp/B001LQSFKY/ref=sr_1_3?ie=UTF8&qid=1505246358&sr=8-3&keywords=lp+sleeves" target="_blank">Inner Sleeves</a>. Audiophile quality to protect your most valuable media.</p>
            </div>
            <div class="col-md-2"></div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <a href="https://www.amazon.com/RPM-Record-Sleeves-100-Count/dp/B003NG2WIG/ref=sr_1_4?ie=UTF8&qid=1505246481&sr=8-4&keywords=lp+sleeves" target="_blank"><img src="https://images-na.ssl-images-amazon.com/images/I/91cxA5jdU4L._SL1500_.jpg" class="img-responsive"></a>
            </div>
            <div class="col-md-6">
                <b><a href="https://www.amazon.com/RPM-Record-Sleeves-100-Count/dp/B003NG2WIG/ref=sr_1_4?ie=UTF8&qid=1505246481&sr=8-4&keywords=lp+sleeves" target="_blank">Jacket Sleeves</a>. High quality outer sleeves to protect your LP jackets.</p>
            </div>
            <div class="col-md-2"></div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <a href="https://www.amazon.com/SPIN-CLEAN-STARTER-RECORD-WASHER-SYSTEM/dp/B002UKSZUU/ref=sr_1_2?ie=UTF8&qid=1505246663&sr=8-2&keywords=lp+washer" target="_blank"><img src="https://images-na.ssl-images-amazon.com/images/I/51tIhDTsASL.jpg" class="img-responsive"></a>
            </div>
            <div class="col-md-6">
                <b><a href="https://www.amazon.com/SPIN-CLEAN-STARTER-RECORD-WASHER-SYSTEM/dp/B002UKSZUU/ref=sr_1_2?ie=UTF8&qid=1505246663&sr=8-2&keywords=lp+washer" target="_blank">LP Washer</a>. Clean the dirt, dust, and grime off of your vintage vinyl.</p>
            </div>
            <div class="col-md-2"></div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2">
                <a href="http://www.needledoctor.com/" target="_blank"><img src="https://s3-media1.fl.yelpcdn.com/bphoto/pVU2wrgIC4pSN5pGcyZnnQ/ls.jpg" class="img-responsive"></a>
            </div>
            <div class="col-md-6">
                <b><a href="http://www.needledoctor.com/" target="_blank">Needle Doctor</a>. Great website for buying turntables, cartridges, phono pre-amps, or anything vinyl!</p>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
    `
}

let fourohfour = {
    template:
    `
    <div>
    <div class="text-center fourohfour">
        <h1>404</h1>
        <br>
        <img src="/images/twilight-zone.jpg" class="responsive">
        <br><br>
        <h4><em>It is a dimension as vast as space and as timeless as infinity.<br>It is the middle ground between light and shadow,<br>between science and superstition,<br>and it lies between the pit of man's fears and the summit of his knowledge.<br>This is the dimension of imagination.<br>It is an area which we call the Twilight Zone.</em></h4>
    </div>
    `
}

var myRouter = new VueRouter({
    routes: [
        {
            path: '/',
            component: index,
        },
        {
            path: '/my-profile',
            component: myProfile,
        },
        {
            path: '/my-collection',
            component: myCollection,
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

var mainVm = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        favoriteArtist: '',
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
    },
    router: myRouter,
    methods: {
        signup: function(event){
            event.preventDefault()
            console.log('clicked on signup-form submit')
            var signupInfo = {
                username : this.username,
                password : this.password,
                favoriteArtist : this.favoriteArtist,
            }
            console.log(signupInfo)
            $.post('/signup', signupInfo, (data) => {
                myRouter.push({ path: 'my-profile' })
            })
        },
        login: function(event){
            event.preventDefault()
            console.log('clicked on login-form submit')
            var loginInfo = {
                username : this.username,
                password : this.password,
            }
            $.post('/login', loginInfo, (data) => {
                console.log(data)
                myRouter.push({ path: 'my-profile' })
            })
        }
    }
})
