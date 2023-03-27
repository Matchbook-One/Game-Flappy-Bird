<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 */

use fhnw\modules\games\flappybird\Events;
use humhub\modules\admin\widgets\AdminMenu;
use humhub\widgets\TopMenu;

return [
  'id'        => 'flappy-bird',
  'class'     => 'fhnw\modules\games\flappybird\FlappyBirdModule',
  'namespace' => 'fhnw\modules\games\flappybird',
  'events'    => [
    [
      'class'    => TopMenu::class,
      'event'    => TopMenu::EVENT_INIT,
      'callback' => [Events::class, 'onTopMenuInit'],
    ],
    [
      'class'    => AdminMenu::class,
      'event'    => TopMenu::EVENT_INIT,
      'callback' => [Events::class, 'onAdminMenuInit']
    ]
  ]
];
