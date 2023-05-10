<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 */

use fhnw\modules\games\flappybird\FlappyBirdModule;

return [
  'id'        => 'flappy-bird',
  'class'     => FlappyBirdModule::class,
  'namespace' => 'fhnw\modules\games\flappybird',
  'events'    => [
    /*
    [
      'class'    => TopMenu::class,
      'event'    => TopMenu::EVENT_INIT,
      'callback' => [Events::class, 'onTopMenuInit'],
    ]*//*,
    [
      'class'    => AdminMenu::class,
      'event'    => AdminMenu::EVENT_INIT,
      'callback' => [Events::class, 'onAdminMenuInit']
    ]*/
  ]
];
