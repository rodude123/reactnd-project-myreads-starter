import React, {Component} from 'react';
import PropTypes from "prop-types";
import * as bpi from './BooksAPI'

class Book extends Component
{
	static propTypes = {book: PropTypes.object.isRequired, getBooks: PropTypes.func.isRequired};
	state = {changed: ""}
	onShelfChange = e =>
	{
		const {book, getBooks} = this.props;
		bpi.update(book, e.target.value).then(res =>
		{
			if (getBooks)
			{
				getBooks()
			}
		});
	};
	
	render()
	{
		const {imageLinks, authors, id, title, shelf} = this.props.book;
		return <div key={id} className="book">
					<div className="book-top">
						<div className="book-cover" style=
							{{
								width: 128,
								height: 193,
								backgroundImage: `url("${imageLinks.smallThumbnail}")`
							}}/>
						<div className="book-shelf-changer">
							<select onChange={this.onShelfChange} value={shelf ? shelf : "none"}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{title}</div>
					<div className="book-authors">{authors.join(", ")}</div>
				</div>
	};
}

export default Book;