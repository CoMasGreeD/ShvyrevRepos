
class photoPost {

    constructor(photoLink = '', author = '', description = '', date = new Date('1999-06-28T07:00:00'), id = '', hashtags = [], liked = []) {
        this.author = author;
        this.photoLink = photoLink;
        this.description = description;
        this.id = id;
        this.date = date;
        this.liked = liked;
		this.hashtags = hashtags;

    }

    validatePhotoPost() {
        function validateID () {
            return this.id && typeof (this.id) === 'string';
        }

        function validateDescription() {
            return this.description && typeof (this.description) === 'string' && this.description.length <= 200;
        }

        function validateCreatedAt() {
            return this.date && typeof (this.date) === 'object';
        }

        function validateAuthor() {
            return this.author && typeof (this.author) === 'string' && this.author.length != 0;
        }

        function validatePhotoLink() {
            return this.photoLink && typeof (this.photoLink) === 'string' && this.photoLink.length != 0;
        }
        function validateLiked() {
            return this.liked && Array.isArray(this.liked) && this.liked.every(function(elem){
                return (typeof(elem)==='string');
            });
        }

        function validateHashtags() {
            return this.hashtags && Array.isArray(this.hashtags) && this.liked.every(function(elem){
                return (typeof(elem)==='string');
            });
        }
        return  function validateAllAttr() {
            return (validateID()
                && validateDescription()
                && validateCreatedAt()
                && validateAuthor()
                && validatePhotoLink()
                && validateHashtags()
                && validateLiked())
        }
    }
}

class Filter {

	constructor(f_author = '', f_hashtags = [], f_date = true) {
		this.f_author = f_author;
		this.f_hashtags = f_hashtags;
		this.f_date = f_date;
	}

	isEmptyFilter() {

		if (this.f_author === '' && this.f_hashtags.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	validateFilter() {

		if (typeof (this.f_author) !== 'string' || !isStringArray(this.f_hashtags)) {
			return false;
		}
		return true;
	}
}


class photoPosts {

    constructor(postsList = []) {
        this._posts = postsList.slice();
    }

    _filterByAuthor(num, author, posts) {

		if (!(typeof (author) === 'string')) {
			console.log('Incorrect argument!');
			return undefined;
		}

		let found = [];
		let count = 0;

		for (let i = 0; (i < posts.length) && (count < num); ++i) {
			if (posts[i].photo.author === author) {
				found.push(posts[i]);
				count++;
			}
		}
		return found;
    }
    
    _filterByHashtags(num, hashtags, posts) {

		let flag = true;
		let found = [];
		let count = 0;

		for (let i = 0; (i < posts.length) && (count < num); ++i) {
			flag = true;
			for (let j = 0; j < hashtags.length; ++j) {
				if (!posts[i].hashtags.includes(hashtags[j])) {
					flag = false;
					break;
				}
			}
			if (flag) {
				found.push(posts[i]);
				count++;
			}
		}
		return found;
    }
    
    getPhotoPosts(skip = 0, top = 10, filterConfig = new Filter()) {
        let result = [];

        result = this._posts.slice();

        if (!(filterConfig.isEmptyFilter()) && filterConfig.validateFilter()) {

			if (filterConfig.f_author !== '') {
				result = this._filterByAuthor(top + skip, filterConfig.f_author, result);
			}
			if (filterConfig.f_hashtags.length !== 0) {
				result = this._filterByHashtags(top + skip, filterConfig.f_hashtags, result);
			}
			result = result.slice(skip);

		} else {
			result= this._posts.slice(skip, skip + top);
		}
        
        this._sortByDate(result);

        return result;
    }

    getPhotoPostByID(id) {
        for (let i = 0; i < this._posts.length; i++) {
            if (this._posts[i].id === id) {
                return this._posts[i];
            }
        }
    }

    editPhotoPost(id, new_post) {

        if (!new_post.validatePhotoPost()) {
            return false;
        }

        let post = this.getPhotoPostByID(id);

        if (post === undefined) {
            return false;
        }

        post.photoLink = new_post.photoLink;
        post.description = new_post.description;
        post.hashtags = new_post.hashtags.slice();
    }

    addPhotoPost(post) {
        if (post.validatePhotoPost()) {
            this._posts.push(post);
            return true;
        }
        return false;
    }

    addAllPosts(postst) {
        for (let i = 0; i < postst.length; i++) {
            this._posts.push(postst[i]);
        }
    }

    _sortByDate(res) {

        res.sort(function (post1, post2) {
            return -(post1.date - post2.date);
        });
        return true;
    }

    removePhotoPost(id) {
        if (id != undefined) {
            for (let i = 0; i < this._posts.length; i++) {
                if (this._posts[i].id === id) {
                    this._posts.splice(i, 1);
                    return true;
                }
            }
        }
        console.log("Failed :(  " + id);
        return false;
    }

    clear() {
        return this._posts.splice(0, this.length);
    }
}
const posts = new photoPosts();
const posts2 = new photoPosts();
console.log(posts.addPhotoPost(new photoPost('http://on018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание Постов,  пустое', new Date('1999-06-28T07:00:00'), '1')));
console.log(posts.addPhotoPost(new photoPost('http://onts/22/Dom.jpg', 'ля какой Влад;)', 'Описание Постов, по стандарту пустое', new Date('2000-06-28T07:00:00'), '2')));
console.log(posts.getPhotoPosts());
console.log(posts.addPhotoPost(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '3')));
console.log(posts.addPhotoPost(new photoPost('http://ont.m.jpg', 'Швырёв Влад;)', 'Описание Постов, по стандарту пустое', new Date('2005-06-28T07:00:00'), '4')));
console.log(posts.getPhotoPosts());
let test = []
test.push(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '10'));
test.push(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '8'));
test.push(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '6'));
posts2.addAllPosts(test);
posts2.addPhotoPost(new photoPost('http://ont.by/web2/Dom.jpg', 'Швырёв Влад;)', 'Описание Постов, по стандарту пустое', new Date('2009-06-28T07:00:00'), '7'));
console.log(posts2.getPhotoPosts());
console.log(posts2.clear());
console.log(posts.removePhotoPost('2'));
console.log(posts.getPhotoPosts());
console.log(posts.getPhotoPostByID('3'));
let tmp = new photoPost('sdsd.jpg', 'nobody', 'WHY??', new Date(), '4')
posts.editPhotoPost('4', tmp);
console.log(posts.getPhotoPosts());