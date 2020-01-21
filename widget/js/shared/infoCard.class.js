/**
 * Created by:
 * Description:
 *
 *
 * note: this is not made into a base class to avoid transpiling
 */


class InfoCard {
	constructor() {
		/**
		 * @type {boolean}
		 */
		this.isActive=true;
		/**
		 * @type {Date}
		 */
		this.createdOn=new Date();
		/**
		 * @type {string}
		 */
		this.createdBy = null;
		/**
		 * @type {Date}
		 */
		this.lastUpdatedOn = new Date();
		/**
		 * @type {string}
		 */
		this.lastUpdatedBy=null;
		/**
		 * @type {Date}
		 */
		this.deletedOn=null;
		/**
		 * @type {string}
		 */
		this.deletedBy=null;
	}
}