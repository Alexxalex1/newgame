// import PreloadScene from 'phaser-preload'

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'gameScene', active: true });
    this.player = null;
    this.cursors = null;
    this.score = 0;
    this.scoreText = null;
  },
  preload: function() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Загрузка...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // this.load.on('fileprogress', function (file) {
    //     assetText.setText('Loading asset: ' + file.key);
    // });

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('logo', 'assets/logo.png');
    for (var i = 0; i < 20; i++) {
      this.load.image('logo' + i * 10, 'assets/logo.png');
    }
    this.load.image('sky', 'assets/sky1.png');
    this.load.image('ground', 'assets/platform2.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('star2', 'assets/star2.png');
    this.load.image('star3', 'assets/star3.png');
    this.load.image('star4', 'assets/star4.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude4.png', {
      frameWidth: 32,
      frameHeight: 48
    });
    //button управления
    this.load.image('left', 'assets/key/bigKey1.png');
    this.load.image('up', 'assets/key/bigKey3.png');
    this.load.image('right', 'assets/key/bigKey2.png');
  },

  create: function() {
    this.add.image(400, 300, 'sky'); //фоновое изображение

    // кнопки управдения
    // this.add.image(80, 80, 'left');
    // this.add.image(160, 80, 'up');
    // this.add.image(240, 80, 'right');

    var platforms = this.physics.add.staticGroup();

    platforms
      .create(400, 568, 'ground')
      .setScale(2)
      .refreshBody();

    platforms.create(650, 120, 'ground'); //1
    platforms.create(80, 200, 'ground'); //2
    platforms
      .create(450, 300, 'ground')
      .setScale(0.5, 1)
      .refreshBody(); //3 center
    platforms.create(900, 300, 'ground'); //3.1
    platforms.create(40, 400, 'ground'); //4

    var player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 30
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8
      }),
      frameRate: 30,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    var stars = this.physics.add.group({
      key: 'star',
      repeat: 0,
      setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 500), stepX: 70 }
    });
    var stars2 = this.physics.add.group({
      key: 'star2',
      repeat: 0,
      setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 500), stepX: 70 }
    });
    var stars3 = this.physics.add.group({
      key: 'star3',
      repeat: 0,
      setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 500), stepX: 70 }
    });
    var stars4 = this.physics.add.group({
      key: 'star4',
      repeat: 0,
      setXY: { x: Phaser.Math.Between(0, 800), y: Phaser.Math.Between(0, 500), stepX: 70 }
    });

    stars.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
    });
    stars2.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
    });
    stars3.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
    });
    stars4.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
    });
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars2, platforms);
    this.physics.add.collider(stars3, platforms);
    this.physics.add.collider(stars4, platforms);
    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.overlap(player, stars2, this.collectStar2, null, this);
    this.physics.add.overlap(player, stars3, this.collectStar3, null, this);
    this.physics.add.overlap(player, stars4, this.collectStar4, null, this);
    this.player = player;
    this.stars = stars;
    this.stars2 = stars2;
    this.stars3 = stars3;
    this.stars4 = stars4;
    var bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, bombs, this.hitBomb, null, this);
    this.bombs = bombs;
  },

  update: function() {
    var cursors = this.cursors;
    var player = this.player;
    var stars = this.stars;
    var stars2 = this.stars2;
    var stars3 = this.stars3;
    var stars4 = this.stars4;
    var bombs = this.bombs;
    var gameOver = false;

    //кнопки на экране
    // var leftButton = this.add
    //   .image(150, 650, 'left')
    //   leftButton.className='leftClass'
      // leftButton
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     isActive = true;
    //   });
    // leftButton.on('pointerup', () => {
    //   isActive = false;
    // });

    // var rightButton = this.add
    //   .image(450, 650, 'right')
    //   rightButton
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     isActiveRight = true;
    //   });
    // rightButton.on('pointerup', () => {
    //   isActiveRight = false;
    // });

    // var upButton = this.add
    //   .image(700, 650, 'up')
    //   upButton
    //   .setInteractive()
    //   .on('pointerdown', () => {
    //     isActiveUp = true;
    //   });
    // upButton.on('pointerup', () => {
    //   isActiveUp = false;
    // });


    if (cursors.left.isDown || isActive === true) {
      player.setVelocityX(-360);
      player.anims.play('left', true);
    } else if (cursors.right.isDown || isActiveRight === true) {
      player.setVelocityX(360);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (
      (cursors.up.isDown && player.body.touching.down) ||
      (isActiveUp === true && player.body.touching.down)
    ) {
      player.setVelocityY(-430);
    }
  },

  collectStar: function(player, star) {
    star.disableBody(true, true, false, false, false);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      
      this.stars.children.iterate(function(child) {
        child.enableBody(true, Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 500), true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }

  },
  collectStar2: function(player, star2) {
    star2.disableBody(true, true, false, false, false);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars2.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars2.children.iterate(function(child) {
        child.enableBody(true, Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 500), true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }

  },
  collectStar3: function(player, star3) {
    star3.disableBody(true, true, false, false, false);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars3.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars3.children.iterate(function(child) {
        child.enableBody(true, Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 500), true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }

  },
  collectStar4: function(player, star4) {
    star4.disableBody(true, true, false, false, false);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars4.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars4.children.iterate(function(child) {
        child.enableBody(true, Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 500), true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }

  },

  hitBomb: function(player, bomb) {
    this.physics.pause();
    this.input.on('pointerdown', () => this.scene.start('preload'));
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks the button, open the modal
    function showModal() {
      modal.style.display = 'block';
    }
    showModal();

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = 'none';
    //   }
    // };
  }
});

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 700
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: GameScene
};

var game = new Phaser.Game(config);
