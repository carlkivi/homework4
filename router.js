const server = require('./server');
const pool = require("./database");

/*
SIIN ON ÄRA DEFINEERITUD ROUTED ERINEVATE VAADETE VAHEL JA MEETODI KUTSED
 */

//See meetod tegeleb delete vt posts.ejs
server.delete('/post/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("Trying to delete a post!");
        const deletepost = await pool.query(
            "DELETE FROM posts WHERE id = $1", [id]
        );
        console.log("redirecting");
        res.redirect('/posts');

    } catch (err) {
        console.error(err.message);
    }
});


//See meetod tegeleb uue postituse lisamisega vt. addnewpost.ejs
server.post('/post', async(req, res) => {
    try {
        const post = req.body;
        console.log("Trying to save post!")
        console.log(post);
        const newpost = await pool.query(
            "INSERT INTO posts(title, body, urllink) values ($1, $2, $3) RETURNING*", [post.title, post.body, post.urllink] );
        res.redirect('/posts');
    } catch (err) {
        console.error(err.message)
    }
});




//koduleht
server.get('/', async(req, res) => {
    try {
        console.log("redirecting from index to posts!");
        const posts = await pool.query(
            "SELECT * FROM posts"
        );
        res.render('posts', { posts: posts.rows });
    } catch (err) {
        console.error(err.message);
    }
});


//postituste leht
server.get('/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts"
        );
        res.render('posts', { posts: posts.rows });
    } catch (err) {
        console.error(err.message);
    }
});


//üksiku postituse kuvamine
server.get('/singlepost/:id', async(req, res) => {
    try {
        const id = req.params.id;
        //console.log(req.params.id);
        console.log("getting post with id: "+ req.params.id);
        const posts = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [id]
        );
        res.render('singlepost', { posts: posts.rows[0] });
    } catch (err) {
        console.error(err.message);
    }
});


//uue postituse lisamine
server.get('/addnewpost', (req, res) => {
    console.log("got an add new post request! directing to form!")
    res.render('addnewpost');
});


// laikide suurendamine
server.put('/singlepost/:id', async (req, res) => {
    try {
        const {id} = req.params;
        console.log("Hakkame suurendame laike postitusel id-ga " + id)
        //const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posts SET likes = likes+1 WHERE id = $1", [id]
        );
        res.render('singlepost');
    } catch (err) {
        console.error(err.message);
    }
});


//bad request!
server.use((req, res) => {
    res.status(404).render('404');
});
