 
                            
	 	function Scene(screen, controls) {
	 		this.canvas = screen.canvas;
	 		this.ctx = this.canvas.getContext('2d');
	 		this.controls = controls;
	 		this.imgs = screen.imgs;

	 	}


	 	function Lib(screen, controls) {
	 		Scene.apply(this, arguments);
	 		this.assets = [
	 			{name: 'orc', path: '/img/orc.png'},
	 			{name: 'player', path: '/img/player.png'},
	 			{name: 'sceleton', path: '/img/sceleton.png'},
	 			{name: 'bg', path: '/img/tiles.png'}
	 			
	 		];

	 		this.total = this.assets.length;
	 		this.loaded = 0;
	 		this.status = "loading";


	 		this.loaded_at = 0;

	 		var self = this;
	 		for(var i=0; i < this.total; i++) {
	 			var img = new Image();
	 			img.onload = function() {
	 				self.loaded++;
	 			};
	 			img.src = self.assets[i].path;
	 			screen.imgs[self.assets[i].name] = img;

	 		}

	 	}

	 	Lib.prototype = Object.create(Scene.prototype);
	 	Lib.prototype.constructor = Lib;

	 	Lib.prototype.render = function (time) {
	 		if(this.status == "loading") {
	 			if(this.loaded == this.total) {
	 				this.status = "loaded";
	 				this.loaded_at = time;
	 			}
	 			this.ctx.fillStyle = '#000000';
	 			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );
	 			this.ctx.fillStyle = '#ffffff';
	 			this.ctx.font="22px Georgia";
	 			this.ctx.fillText("Loading " + this.loaded + '/' + this.total,50,70);
	 			return "lib";
	 		}

	 		if(this.status == "loaded") {
	 			if((time - this.loaded_at) > 1000) {
	 				return "game";
	 			} else {
	 				return "lib";
	 			}
	 		}

	 	}



	 	function Win(screen, controls) {
	 		Scene.apply(this, arguments);
	 	}

	 	Win.prototype = Object.create(Scene.prototype);
	 	Win.prototype.constructor = Win;


	 	Win.prototype.render = function (time) {
	 		this.ctx.fillStyle = '#000000';
	 		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );
	 		this.ctx.fillStyle = '#ffffff';
	 		this.ctx.font="22px Georgia";
	 		this.ctx.fillText("You won!",50,70);
	 		return "win";
	 	};

	 	function Menu(screen, controls) {//изменить интерфейс
	 		Scene.apply(this, arguments);
	 	}

	 	Menu.prototype = Object.create(Scene.prototype);
	 	Menu.prototype.constructor = Menu;


	 	Menu.prototype.render = function (time) {

	 	this.ctx.drawImage(this.imgs['title'],
	 				0,0,1280,1280,
	 				0,0,1280,1280);

	 			this.ctx.fillStyle = '#FFFFFF';
	 			this.ctx.font="22px Arial";
	 			this.ctx.fillText("Begin to Game",250,500);
	 	this.ctx.drawImage(this.imgs['Cyclops'],
	 				0,0,60,90,
	 				100,100,60,100);





	 		if(this.controls.states['fire']) {
	 			return "game";
	 		} else {
	 			return "menu";
	 		}
	 	};


	 	function Game(screen, controls) {
	 		Scene.apply(this, arguments);

			this.i=1;//position ////sever
	 		this.camera = new Camera(0,0,this);
	 		this.status="connect";





			 this.player = new Player(100,20,this);this.player.Action=true;//position Server



			 this.monster = new Player(200,428,this);
                this.monster.type="monster";


			 this.monster1 = new Player(300,228,this);
                this.monster1.type="monster";
			 this.monster2 = new Player(500,428,this);
			     this.monster2.type="monster";
			 this.monster3 = new Player(300,528,this);
                    this.monster3.type="monster";







	 		this.sounds = {};
	 		this.sounds['arrow'] = new Sound('/sounds/arrow.wav');
	 		this.sounds['sword'] = new Sound('/sounds/sword.wav');

	 		this.map = [
			     [5 ,0,0,0 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5],
			     [5 ,0,0,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5],
				 [5 ,5,0,5 ,5 ,0 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,0 ,0 ,0 ,5],
				 [5 ,5,0,5 ,5 ,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,5],
				 [5 ,0,0,5 ,5 ,0 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5],
				 [5 ,5,5,5 ,5 ,0 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,5],
				 [5 ,0,5,5 ,5 ,5 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,5],
				 [5 ,0,5,5 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,0 ,0 ,0 ,5],
				 [5 ,5,5,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,0 ,5],
				 [5 ,5,5,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,0 ,5],
				 [5 ,0,0,0 ,0 ,0 ,0 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,5 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5],
				 [5 ,0,0,0 ,5,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5],
				 [5 ,5,5,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5 ,5],
		];

			this.tiles = [
				{j:0,i:0,walk: true},  //0 - grass
				{j:1,i:0,walk: false}, //1 - stone
				{j:2,i:0,walk: true},  //2 - plant
				{j:3,i:0,walk: false}, //3 - tree
				{j:4,i:0,walk: true},  //4 - flowers
				{j:5,i:0,walk: false}, //5 - wall
				{j:6,i:0,walk: false}, //6 - top wall
				{j:7,i:0,walk: false}, //7 - top wall with r end
				{j:8,i:0,walk: false}, //8 - top wall with l end
				{j:9,i:0,walk: false}, //9 - wall with r end
				{j:5,i:1,walk: false}, //10 - bottom-wall
				{j:6,i:1,walk: false}, //11 - bottom-wall with r-end
				{j:7,i:1,walk: false}, //12 - bottom-wall with l-end
				{j:8,i:1,walk: false}, //13 - wall with l end
				{j:9,i:1,walk: true}, //14 - top-grass with l-end
				{j:9,i:2,walk: true}, //15 - top-grass with r-end
				{j:8,i:2,walk: true}, //16 - stairs
				{j:0,i:1,walk: true}, //17 - sand in grass b-r
				{j:1,i:1,walk: true}, //18 - sand in grass b
				{j:2,i:1,walk: true}, //19 - sand in grass b-l
				{j:0,i:2,walk: true}, //20 - sand in grass r
				{j:1,i:2,walk: true}, //21 - sand
				{j:2,i:2,walk: true}, //22 - sand in grass l
				{j:0,i:3,walk: true}, //23 - sand in grass u-r
				{j:1,i:3,walk: true}, //24 - sand in grass u
				{j:2,i:3,walk: true}, //25 - sand in grass u-l
				{j:3,i:1,walk: true}, //26 - gras in sand b-r
				{j:4,i:1,walk: true}, //27 - gras in sand b-l
				{j:3,i:2,walk: true}, //28 - gras in sand u-r
				{j:4,i:2,walk: true}, //29 - gras in sand u-l
			];


			this.arrows = [];

		}

		Game.prototype = Object.create(Scene.prototype);
		Game.prototype.constructor = Game;

		Game.prototype.render_bg = function (time) {
			var start_col = Math.floor(this.camera.x / 64);
			var start_row = Math.floor(this.camera.y / 64);

			for(var i = start_row; i < (start_row + 11); i++) {
				for(var j = start_col; j < (start_col + 11); j++) {
					if(( j < 20) && (i < 20)) {
						var tile = this.tiles[this.map[i][j]];
	              		this.ctx.drawImage(this.imgs['bg'],
	                    	tile.j*64,tile.i*64,64,64,
	                          	(j*64)-this.camera.x,(i*64) - this.camera.y ,64,64);
                                                }
				}
			}
            console.log(this.player.x,this.player.y);//доставать!!
		};


		Game.prototype.render_sprites = function (time) {//тут добавлять число рисующих


			this.player.update(time);
			this.monster.update(time);
			this.camera.update(time);
            this.monster1.update(time);
            this.monster2.update(time);
            this.monster3.update(time);
			//render monster

	 	 this.ctx.drawImage(this.imgs['sceleton'],
	 	 this.monster.j*64,this.monster.i*64,64,64, ( this.monster.x )-this.camera.x,(this.monster.y) - this.camera.y ,64,64);
	 	 this.ctx.drawImage(this.imgs['orc'],
	 	 this.monster1.j*64,this.monster1.i*64,64,64, ( this.monster1.x )-this.camera.x,(this.monster1.y) - this.camera.y ,64,64);
	 	 this.ctx.drawImage(this.imgs['sceleton'],
	 	 this.monster2.j*64,this.monster2.i*64,64,64, ( this.monster2.x )-this.camera.x,(this.monster2.y) - this.camera.y ,64,64);
	 	 this.ctx.drawImage(this.imgs['orc'],
	 	 this.monster3.j*64,this.monster3.i*64,64,64, ( this.monster3.x )-this.camera.x,(this.monster3.y) - this.camera.y ,64,64);


			//render player

			this.ctx.drawImage(this.imgs['sceleton'],
	                    this.player.j*64,this.player.i*64,64,64,
	                          ( this.player.x )-this.camera.x,(this.player.y) - this.camera.y ,64,64);

			//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);


			//render arows
			for(var  i=this.arrows.length;i>0;i--) {
					 if ( this.arrows[i-1].active === false) this.arrows.splice(i-1, 1);
			}

			for(var  i=0;i<this.arrows.length;i++) {
				this.arrows[i].update(time);
				this.ctx.drawImage(this.imgs['player'],
		                    this.arrows[i].j*64,this.arrows[i].i*64,64,64,
		                          ( this.arrows[i].x )-this.camera.x,(this.arrows[i].y) - this.camera.y ,64,64);

			}
		};



		Game.prototype.render = function (time) {
			this.ctx.fillStyle = '#ffffff';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height );

			this.render_bg(time);
			this.render_sprites(time);

			if((this.monster.dead) &&
			   (this.player.x > 1152) &&
				 (this.player.y > 1100)) {
					 	return "win";
				 } else {
						return "game";
				 }
		};



		function Camera(x,y,scene) {
			this.x = x;
			this.y = y;
			this.w = 640;
			this.h = 640;
			this.scene = scene;
		}

		Camera.prototype.update = function (time) {
			if((this.scene.player.x - this.x) < 120) {//200
				this.x = this.scene.player.x  - 120;
			}

			if((this.scene.player.x - this.x) > 440) {//440
				this.x = this.scene.player.x  - 440;
			}

			if(this.x < 0) this.x = 0;
			if(this.x > 640) this.x = 640;


			if((this.scene.player.y - this.y) < 200) {
				this.y = this.scene.player.y  - 200;
			}

			if((this.scene.player.y - this.y) > 440) {
				this.y = this.scene.player.y  - 440;
			}

			if(this.x < 0) this.x = 0;
			if(this.x > 640) this.x = 640;

			if(this.y < 0) this.y = 0;
			if(this.y > 640) this.y = 640;

		};


	function Arrow(x,y,direction,scene) {
		this.active = true;
		this.x = x;
		this.y = y;
		this.scene = scene;
		this.speed = 10;
		this.direction = direction;
		this.sprites = {
			right: [10,0],
			left: [9,0],
			up: [11,0],
			down: [12,0]
		};
		this.j = this.sprites[direction][0];
		this.i = this.sprites[direction][1];
	}

	Arrow.prototype.update = function (time) {
			this.move();
	};

	Arrow.prototype.move = function () {
		var new_x = this.x;
		var new_y = this.y;
		if(this.direction == "right" ) new_x += this.speed;
		if(this.direction == "left" ) new_x -= this.speed;
		if(this.direction == "up" ) new_y -= this.speed;
		if(this.direction == "down" ) new_y += this.speed;


		if(this.is_hit(new_x,new_y)) {
			this.active = false;
			return true;
		} else {
			this.x = new_x;
			this.y = new_y;
		}
	}
                  Arrow.prototype.is_hit = function (x,y) {
	var pos_x = x;
	var pos_y = y;
	if(this.direction == "right" ) {pos_x += 64; pos_y += 32; };
	if(this.direction == "left" ) {pos_y += 32; };
	if(this.direction == "up" ) {pos_x += 32;  };
	if(this.direction == "down" ) {pos_x += 32; pos_y += 64; };

	if((pos_x < 0) || (pos_x > 1280) || (pos_y < 0) || (pos_y > 1280)) {
		return true;
	}

	var j = Math.floor(pos_x / 64);
	var i = Math.floor(pos_y / 64);

	if((pos_x > this.scene.monster.x) &&
	   (pos_x < (this.scene.monster.x + 64)) &&
		 (pos_y > this.scene.monster.y) &&
		(pos_y < (this.scene.monster.y + 64))) {
			this.scene.monster.set_action("down","dead");
			return true;
		}
                
                    if((pos_x > this.scene.monster1.x) &&
	   (pos_x < (this.scene.monster1.x + 64)) &&
		 (pos_y > this.scene.monster1.y) &&
		(pos_y < (this.scene.monster1.y + 64))) {
			this.scene.monster.set_action("down","dead");
			return true;
		}
                
                     if((pos_x > this.scene.monster2.x) &&
	   (pos_x < (this.scene.monster2.x + 64)) &&
		 (pos_y > this.scene.monster2.y) &&
		(pos_y < (this.scene.monster2.y + 64))) {
			this.scene.monster.set_action("down","dead");
			return true;
		}
                     if((pos_x > this.scene.monster3.x) &&
	   (pos_x < (this.scene.monster3.x + 64)) &&
		 (pos_y > this.scene.monster3.y) &&
		(pos_y < (this.scene.monster3.y + 64))) {
			this.scene.monster.set_action("down","dead");
			return true;
		}
                
		return	!this.scene.tiles[this.scene.map[i][j]].walk;
	}  
                    
                    
                    
                    
                    
	Arrow.prototype.is_hit = function (x,y) {
	var pos_x = x;
	var pos_y = y;
	if(this.direction == "right" ) {pos_x += 64; pos_y += 32; };
	if(this.direction == "left" ) {pos_y += 32; };
	if(this.direction == "up" ) {pos_x += 32;  };
	if(this.direction == "down" ) {pos_x += 32; pos_y += 64; };

	if((pos_x < 0) || (pos_x > 1280) || (pos_y < 0) || (pos_y > 1280)) {
		return true;
	}

	var j = Math.floor(pos_x / 64);
	var i = Math.floor(pos_y / 64);


	if((pos_x > this.scene.monster.x) &&
	   (pos_x < (this.scene.monster.x + 64)) &&
		 (pos_y > this.scene.monster.y) &&
		(pos_y < (this.scene.monster.y + 64))) {
			this.scene.monster.set_action("down","dead");
			return true;
		}
                
                    if((pos_x > this.scene.monster1.x) &&
	   (pos_x < (this.scene.monster1.x + 64)) &&
		 (pos_y > this.scene.monster1.y) &&
		(pos_y < (this.scene.monster1.y + 64))) {
			this.scene.monster1.set_action("down","dead");
			return true;
		}
                
                     if((pos_x > this.scene.monster2.x) &&
	   (pos_x < (this.scene.monster2.x + 64)) &&
		 (pos_y > this.scene.monster2.y) &&
		(pos_y < (this.scene.monster2.y + 64))) {
			this.scene.monster2.set_action("down","dead");
			return true;
		}
                     if((pos_x > this.scene.monster3.x) &&
	   (pos_x < (this.scene.monster3.x + 64)) &&
		 (pos_y > this.scene.monster3.y) &&
		(pos_y < (this.scene.monster3.y + 64))) {
			this.scene.monster3.set_action("down","dead");
			return true;
		}
              
                
		return	!this.scene.tiles[this.scene.map[i][j]].walk;
	}
        

		function Player(x,y,scene) {//задаеться карта тут....странно
			this.x = x;
			this.y = y;
			this.i = 0;
			this.j = 0;
			this.Action=false;
			this.type = "player";
			this.scene = scene;
			this.dead = false;
			this.lastTime = 0;
			this.speed = 3;
			this.direction = "down";
			this.status = "start";
			this.change_animation = true;
			this.current_animation_frame = 0;
			this.current_action = this.move_down;
			this.got_obstacle = false;
			this.sprites = {
				standing: {
					right: {
						total: 1,
						frames: [[0,3]]
					},
					left: {
						total: 1,
						frames: [[0,1]]
					},
					up: {
						total: 1,
						frames: [[0,0]]
					},
					down: {
						total: 1,
						frames: [[0,2]]
					}
				},
				walking: {
					right: {
						total: 9,
						frames: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11]]
					},
					left: {
						total: 9,
						frames: [[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9]]
					},
					up: {
						total: 9,
						frames: [[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8]]
					},
					down: {
						total: 9,
						frames: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10]]
					}
				},
				start: {
					down: {
						total: 9,
						frames: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10]]
					}
				},
				dead: {
					down: {
						total: 6,
						frames: [[0,20],[1,20],[2,20],[3,20],[4,20],[5,20]]
					}
				},
				fire: {
					right: {
						total: 13,
						frames: [[0,19],[1,19],[2,19],[3,19],[4,19],[5,19],[6,19],[7,19],[8,19],[9,19],[10,19],[11,19],[12,19]]
					},
					left: {
						total: 13,
						frames: [[0,17],[1,17],[2,17],[3,17],[4,17],[5,17],[6,17],[7,17],[8,17],[9,17],[10,17],[11,17],[12,17]]
					},
					up: {
						total: 13,
						frames: [[0,16],[1,16],[2,16],[3,16],[4,16],[5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16]]
					},
					down: {
						total: 13,
						frames: [[0,18],[1,18],[2,18],[3,18],[4,18],[5,18],[6,18],[7,18],[8,18],[9,18],[10,18],[11,18],[12,18]]
					}
				},
				attack: {
					right: {
						total: 6,
						frames: [[0,15],[1,15],[2,15],[3,15],[4,15],[5,15]]
					},
					left: {
						total: 6,
						frames: [[0,13],[1,13],[2,13],[3,13],[4,13],[5,13]]
					},
					up: {
						total: 6,
						frames: [[0,12],[1,12],[2,12],[3,12],[4,12],[5,12]]
					},
					down: {
						total: 6,
						frames: [[0,14],[1,14],[2,14],[3,14],[4,14],[5,14]]
					}
				}

			};
		};


		Player.prototype.animate = function () {

			var frame = this.sprites[this.status][this.direction];

			if(this.dead) {
				return true;
			}

			if(this.change_animation) {
				this.change_animation = false;
				this.current_animation_frame = 0;
			} else {
				if(frame.total > 1) {
					this.current_animation_frame++;
					if( (this.current_animation_frame + 1) == frame.total ) {
						if((this.status == "start") || (this.status == "walking") || (this.status == "attack")) {
							this.current_animation_frame = 0;
						}

						if(this.status == "dead") {
							this.current_animation_frame = 5;
							this.dead = true;
						}

						if(this.status == "fire") {
							this.current_animation_frame = 0;
							this.set_action(this.direction,"standing");
							this.scene.arrows.push(new Arrow(this.x,this.y,this.direction,this.scene) );
							this.scene.sounds['arrow'].play();
						}
					}
				}
			}


			this.j = frame.frames[this.current_animation_frame][0];
			this.i = frame.frames[this.current_animation_frame][1];

		};

		Player.prototype.set_action = function (direction,status) {
			if(this.direction != direction) {
				this.direction = direction;
				this.change_animation = true;
			}

			if(this.status != status) {
				this.status = status;
				this.change_animation = true;
			}
		};

		Player.prototype.is_walkable = function (x,y) {

			if(x < 0 ) {
				this.got_obstacle = true;
				return false;
			};
			if(y < 0) {
				this.got_obstacle = true;
				return false;
			};

			var x1 = x;
			var x2 = x + 64;
			var y1 = y;
			var y2 = y+64;

			x1 = x1 + 20;
			x2 = x2 - 20;
			y1 = y1 +20;
			y2 = y2 -10;

			var j1 = Math.floor((x1) / 64);
			var j2 = Math.floor((x2) / 64);
			var i1 = Math.floor((y1) / 64);
			var i2 = Math.floor((y2) / 64);

			var walkable = true;

			for(var i = i1; i <= i2; i++) {
				for(var j = j1; j <= j2; j++) {
					if(!this.scene.tiles[this.scene.map[i][j]].walk) {
						walkable = false;
					}
				}
			}

			this.got_obstacle = !walkable;
			return walkable;

		};

		Player.prototype.move_left = function () {
			this.set_action("left","walking");

			if(this.is_walkable(this.x - this.speed,this.y)) {
				this.x = this.x - this.speed;
				if(this.x < 0) {
					this.x = 0;
				}
			}
		};

		Player.prototype.move_right = function () {
			this.set_action("right","walking");
			if(this.is_walkable(this.x + this.speed,this.y)) {
				this.x = this.x + this.speed;
				if(this.x > 1216) {
					this.x =1216;
				}
			}
		};

		Player.prototype.move_up = function () {
			this.set_action("up","walking");
			if(this.is_walkable(this.x ,this.y - this.speed)) {
				this.y = this.y - this.speed;
				if(this.y < 0) {
					this.y =0;
				}
			}
		};

		Player.prototype.move_down = function () {
			this.set_action("down","walking");
			if(this.is_walkable(this.x,this.y + this.speed)) {
				this.y = this.y + this.speed;
				if(this.y > 1216) {
					this.y =1216;
				}
			}
		};


		Player.prototype.fire = function () {
			this.set_action(this.direction,"fire");
		}

		Player.prototype.attack = function () {
			this.set_action(this.direction,"attack");
		}

		Player.prototype.start = function () {
			if(this.y < 100) {
				this.y = this.y + this.speed;
			} else {
				this.set_action("down","standing");
			}

		}

		Player.prototype.update = function (time) {
				this.animate();

				if(this.status == "start") {
					this.start();
					return true;
				}

				if(this.status == "fire") {
					return true;
				}

				if(this.status == "dead") {
					return true;
				}

				if(this.type == "monster") {
					return this.monster_ai_controll(time);
				}

				if(this.scene.controls.states['fire']) {
					this.fire();
					return true;
				}

				if(this.scene.controls.states['left']) {
					this.move_left();
					return true;
				}

				if(this.scene.controls.states['right']) {
					this.move_right();
					return true;
				}

				if(this.scene.controls.states['forward']) {
					this.move_up();
					return true;
				}

				if(this.scene.controls.states['backward']) {
					this.move_down();
					return true;
				}

				this.set_action(this.direction,"standing");

                                                      
		}

		Player.prototype.monster_ai_controll = function (time) {

			if((this.scene.player.dead == false) &&
				(this.scene.player.x < this.x + 64 &&
	   			this.scene.player.x + 64 > this.x &&
	   			this.scene.player.y < this.y + 64 &&
	   			64 + this.scene.player.y > this.y)) {
			  //тактический прыжок
				if(this.x > this.scene.player.x) {
					this.direction = "left";
					this.y = this.scene.player.y;
					this.x = this.scene.player.x + 32;
				} else {
					this.direction = "right";
					this.y = this.scene.player.y;
					this.x = this.scene.player.x - 32;
				}
				this.attack();
				this.scene.sounds['sword'].play();
				this.scene.player.set_action("down","dead");
				return true;
			}


			if((this.got_obstacle) || ((time - this.lastTime) > 3000 )) {
				var actions = [this.move_left,this.move_right,this.move_up,this.move_down];
				this.current_action = actions[Math.floor(Math.random() * actions.length)];
				this.lastTime = time;

			}

			this.current_action();
                                                     
			return true;
		};

		function Sound(src) {
		    this.sound = document.createElement("audio");
		    this.sound.src = src;
		    this.sound.setAttribute("preload", "auto");
		    this.sound.setAttribute("controls", "none");
		    this.sound.style.display = "none";
		    document.body.appendChild(this.sound);
		}

		Sound.prototype.play = function () {
			this.sound.play();
		};

		Sound.prototype.stop = function () {
			this.sound.pause();
		};

	    function Controls() {
	        this.codes  = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward', 32: 'fire',1:'mouseR',3:'mouseL' };
	        this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false, 'fire' : false ,'mouserhigt':false};
                         document.addEventListener('keydown', this.onKey.bind(this, true), false);
	        document.addEventListener('keyup', this.onKey.bind(this, false), false);
                        
	     }

                         document.getElementById('screen').onclick=function(evet) {
                                console.log(evet);
                        };

	    Controls.prototype.onKey = function(val, e) {
                        console.log(e.keyCode);
                        var state = this.codes[e.keyCode];///mouse.sweed..e
          


	        if (typeof state === 'undefined') return;//
	        this.states[state] = val;
	        e.preventDefault && e.preventDefault();
	        e.stopPropagation && e.stopPropagation();
	    };
                    
	    function GameLoop() {
	        this.frame = this.frame.bind(this);
	        this.lastTime = 0;
	        this.callback = function() {};
	    }

	    GameLoop.prototype.start = function(callback) {
	       	this.callback = callback;
	        requestAnimationFrame(this.frame);
	    };

	    GameLoop.prototype.frame = function(time) {

	        if((time - this.lastTime) > 30) {
	        	this.lastTime = time;
	        	this.callback(time);
	        }
	        requestAnimationFrame(this.frame);
	    };


	   

	    var controls =new Controls();
	    var screen = {};
	    screen.canvas = document.getElementById('screen');

		screen.canvas.width = 640;
	    screen.canvas.height = 640;
	    screen.imgs = {};
	    var loop = new GameLoop();

	    var scenes = {};
	    scenes['lib'] = new Lib(screen, controls);
	   // scenes['menu'] = new Menu(screen, controls);
	    scenes['game'] = new Game(screen, controls);
		scenes['win'] = new Win(screen, controls);

	    var current_scene = 'lib';

	    loop.start(function frame(time) {

	      	current_scene = scenes[current_scene].render(time);

	    });
	    
	    'use strict';

	    var usernamePage = document.querySelector('#username-page');
	    var chatPage = document.querySelector('#chat-page');
	    var usernameForm = document.querySelector('#usernameForm');
	    var messageForm = document.querySelector('#messageForm');
	    var messageInput = document.querySelector('#message');
	    var messageArea = document.querySelector('#messageArea');
	    var connectingElement = document.querySelector('.connecting');
	    var message =null;
	    var stompClient = null;
	    var username = null;
	    var player={};
	    var i=0;
	    var colors = [
	        '#2196F3', '#32c787', '#00BCD4', '#ff5652',
	        '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
	    ];

	    function connect(event) {
	        username = document.querySelector('#name').value.trim();

	        if(username) {
	            usernamePage.classList.add('hidden');
	            chatPage.classList.remove('hidden');

	            var socket = new SockJS('/ws');
	            stompClient = Stomp.over(socket);

	            stompClient.connect({}, onConnected, onError);
	        }
	        event.preventDefault();
	    }


	    function onConnected() {///1
	        // Subscribe to the Public Topic
	        stompClient.subscribe('/topic/public', onMessageReceived);

	        // Tell your username to the server
	        stompClient.send("/app/chat.addUser",
	            {},
	            JSON.stringify({sender: username, type: 'JOIN'})
	        )
	        console.log("!!! Connect function !!!");
	        
	        connectingElement.classList.add('hidden');
	    }


	    function onError(error) {
	        connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
	        connectingElement.style.color = 'red';
	    }


	    function sendMessage(event) {
	        var messageContent = messageInput.value.trim();

	        if(messageContent && stompClient) {
	            var chatMessage = {
	                sender: username,
	                content: messageInput.value,
	                type: 'CHAT'
	            };
	            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
	            messageInput.value = '';
	        }
	        
	        event.preventDefault();
	       console.log("Messege!!!");
	       console.log(ChatMMessage);
	    }


	    function onMessageReceived(payload) {
	        message = JSON.parse(payload.body);
	        
	        var messageElement = document.createElement('li');

	        if(message.type === 'JOIN') {
	        	i++;
	            messageElement.classList.add('event-message');
	            message.content = message.sender + ' joined!';
	            
	        } else if (message.type === 'LEAVE') {
	            messageElement.classList.add('event-message');
	            message.content = message.sender + ' left!';
	            
	        } else {
	            messageElement.classList.add('chat-message');

	            var avatarElement = document.createElement('i');
	            var avatarText = document.createTextNode(message.sender[0]);
	            avatarElement.appendChild(avatarText);
	            avatarElement.style['background-color'] = getAvatarColor(message.sender);

	            messageElement.appendChild(avatarElement);

	            var usernameElement = document.createElement('span');
	            var usernameText = document.createTextNode(message.sender);
	            usernameElement.appendChild(usernameText);
	            messageElement.appendChild(usernameElement);
	            
	        }

	        var textElement = document.createElement('p');
	        var messageText = document.createTextNode(message.content);
	        textElement.appendChild(messageText);

	        messageElement.appendChild(textElement);

	        messageArea.appendChild(messageElement);
	        messageArea.scrollTop = messageArea.scrollHeight;
	        
	        console.log("!!! onMessageReceived  !!");
	       
	         player[i]=message;//лишь добалление потом буду ,удаление 
	         
	         console.log(i);
	         console.log(player);///need all
	         console.log(payload);
	        
	    }


	    function getAvatarColor(messageSender) {
	        var hash = 0;
	        for (var i = 0; i < messageSender.length; i++) {
	            hash = 31 * hash + messageSender.charCodeAt(i);
	        }

	        var index = Math.abs(hash % colors.length);
	        return colors[index];
	    }

	    usernameForm.addEventListener('submit', connect, true)
	    messageForm.addEventListener('submit', sendMessage, true)
	    
	       
		