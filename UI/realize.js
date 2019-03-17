(function () {
    let photoPosts = [
        {
            id: '1',
            descriprion: 'Описание Постов, по стандарту пустое',

            createdAt: new Date('1999-06-28T07:00:00'),

            author: 'Швырёв Влад;)',

            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '2',
            descriprion: 'Описание Постов, по стандарту пустое',

            createdAt: new Date('1999-06-28T07:07:00'),

            author: 'Швырёв Влад;)',

            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        },
        {
            id: '3',
            descriprion: 'Описание Постов, по стандарту пустое',

            createdAt: new Date('2010-09-28T07:00:00'),

            author: 'Швырёв Влад;)',

            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '4',
            descriprion: 'Описание Постов, по стандарту пустое',

            createdAt: new Date('2005-06-28T07:05:00'),

            author: 'Швырёв Влад;)',

            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '5',
            descriprion: 'Описание Постов, по стандарту пустое',

            createdAt: new Date('2000-07-28T07:00:00'),

            author: 'Швырёв Влад;)',

            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '6',
            descriprion: 'Описание Постов, по стандарту пустое',

            createdAt: new Date('2000-06-28T07:00:00'),

            author: 'Швырёв Влад;)',

            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '7',
            descriprion: 'Описание Постов, по стандарту пустое',

            createdAt: new Date('1999-06-28T07:00:00'),

            author: 'Швырёв Влад;)',

            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
    ];
    function sort() {
        const sortedPosts=photoPosts.sort(function (post1, post2) {
            return -(post1.createdAt - post2.createdAt);
        });
        return sortedPosts;
    }
    photoPosts=sort();
    function findPostIndex(id) {
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id == id) {
                return i;
            }
        }
        return false;
    }
   /* Это функция через indexOf не хочет работать корректно, поэтому вернулся к старому рабочему варианту
   function findPostIndex(id) {  
                return photoPosts.indexOf(function(post){
                    return post.id === id;
                });
   }*/ 
    function validateID(post) {    
             return post.id && typeof (post.id) === 'string';
    }

    function validateDescription(post) {
        return post.descriprion && typeof(post.descriprion) === 'string' && post.descriprion.length <=200;
    }

    function validateCreatedAt(post) {
        return post.createdAt && typeof(post.createdAt) === 'object';
    }

    function validateAuthor(post) {
        return post.author && typeof(post.author) === 'string' && post.author.length != 0;
    }

    function validatePhotoLink(post) {
        return post.photoLink && typeof(post.photoLink) === 'string' && post.photoLink.length !=0;
    }
    function validatePhotoPost(post) {
        if (post != undefined) {
            return validateID(post)
                & validateDescription(post)
                & validateCreatedAt(post)
                & validateAuthor(post)
                & validatePhotoLink(post)
        }
    }
    function addPhotoPost(post) {
        if (validatePhotoPost(post)) {
            photoPosts.push(post);
            return true;
        }
        return false;
    }
    function getPhotoPostByID(id) {
        console.log("данный пост по введённому id : " + id);
        console.log(photoPosts[findPostIndex(id)]);
        return photoPosts[findPostIndex(id)];
    }
    function removePhotoPost(id) {
        if (id != undefined) {
            let RemoveIndex = findPostIndex(id);
            if (RemoveIndex != -1) {
                photoPosts.splice(RemoveIndex, 1);
                return true;
            }
        }
        console.log("Failed :(  " + id);
        return false;
    }

    function show(p, skip = 0, top = 10) {
        return p.slice(skip, skip + top);
    }
    function editPhotoPost(id, params) {
        let ChangeIndex = findPostIndex(id)
        let postToChange = photoPosts[ChangeIndex];
        if (validatePhotoPost(postToChange)) {
            for (var param in params) {
                postToChange[param] = params[param];
            }
            return true;
        }
        return false;
    }

    removePhotoPost("5");
    editPhotoPost("1", {
        descriprion: "New description",
        author: 'Nobody',
    });
    console.log(show(photoPosts, 0, 10));

})();