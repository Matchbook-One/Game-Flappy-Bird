<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 * @var View $this
 */

use fhnw\modules\games\flappybird\assets\Assets;
use yii\web\View;

Assets::register($this);

$this->registerJsConfig('flappy-bird', []);
$this->registerCss('flappy-bird');

