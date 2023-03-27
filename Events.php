<?php

/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 */

namespace fhnw\modules\games\flappybird;

use Yii;
use yii\base\Event;
use yii\helpers\Url;

/**
 *
 */
class Events
{
  /**
   * Defines what to do if admin menu is initialized.
   *
   * @param Event $event
   *
   * @return void
   */
  public static function onAdminMenuInit(Event $event): void
  {
    $config = [
      'label'     => 'Flappy Bird',
      'url'       => Url::to(['/flappybird/admin']),
      'group'     => 'manage',
      'icon'      => '<i class="fa fa-crow"></i>',
      'isActive'  => (Yii::$app->controller->module &&
                      Yii::$app->controller->module->id === 'flappybird' &&
                      Yii::$app->controller->id === 'admin'),
      'sortOrder' => 99999,
    ];
    $event->sender->addItem($config);
  }

  /**
   * Defines what to do when the top menu is initialized.
   *
   * @param Event $event
   *
   * @return void
   */
  public static function onTopMenuInit($event): void
  {
    $config = [
      'label'     => 'Flappy Bird',
      'icon'      => '<i class="fa fa-crow"></i>',
      'url'       => Url::to(['/flappybird/index']),
      'sortOrder' => 99999,
      'isActive'  => (Yii::$app->controller->module &&
                      Yii::$app->controller->module->id === 'flappybird' &&
                      Yii::$app->controller->id === 'index'),
    ];
    $event->sender->addItem($config);
  }
}
