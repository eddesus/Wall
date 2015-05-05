exports.definition = {
	config: {
		adapter: {
			type: "post_rest",
			collection_name: "posts",
			base_url: BASE_URL + '/posts'
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			id: 'id'
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};