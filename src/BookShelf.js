import React, {Component} from 'react';
import Book from "./Book";
import PropTypes from "prop-types";

class BookShelf extends Component
{
	static propTypes ={books : PropTypes.array.isRequired, bkTitle: PropTypes.string.isRequired, getBooks: PropTypes.func.isRequired}
	render()
	{
		const {bkTitle, books, getBooks} = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{bkTitle}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map(book =>
							(
								<li key={book.title}>
									<Book book={book} getBooks={getBooks}/>
								</li>
							))
						}
					</ol>
				</div>
			</div>
		);
	}
}

export default BookShelf;