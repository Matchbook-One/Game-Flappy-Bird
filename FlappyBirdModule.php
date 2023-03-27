<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 */

namespace fhnw\modules\games\flappybird;

use fhnw\modules\gamecenter\components\GameModule;
use humhub\modules\content\components\ContentContainerActiveRecord;
use humhub\modules\user\models\User;
use Yii;
use yii\helpers\Url;

/**
 * @property-read string[] $contentContainerTypes
 * @property-read string   $configUrl
 * @phpstan-import-type GameConfig from GameModule
 * @phpstan-import-type AchievementConfig from GameModule
 */
class FlappyBirdModule extends GameModule
{
  /**
   * @phpstan-return AchievementConfig[]
   * @return array
   */
  public function getAchievementConfig(): array
  {
    return [
      ['name' => 'first-game', 'title' => 'Win your first game', 'description' => 'Win your first game']
    ];
  }

  /**
   * @inheritdoc
   * @return string the url
   * @noinspection PhpMissingParentCallCommonInspection
   */
  public function getConfigUrl(): string
  {
    return Url::to(['/flappybird/admin']);
  }

  /**
   * @inheritdoc
   *
   * @param ContentContainerActiveRecord $container unused
   *
   * @return string
   * @noinspection PhpMissingParentCallCommonInspection
   */
  public function getContentContainerDescription(ContentContainerActiveRecord $container): string
  {
    return Yii::t('FlappyBirdModule.base', 'description');
  }

  /**
   * @inheritdoc
   *
   * @param ContentContainerActiveRecord $container unused
   *
   * @return string
   * @noinspection PhpMissingParentCallCommonInspection
   */
  public function getContentContainerName(ContentContainerActiveRecord $container): string
  {
    return Yii::t('FlappyBirdModule.base', 'name');
  }

  /**
   * @inheritdoc
   * @return string[] valid content container classes
   * @noinspection PhpMissingParentCallCommonInspection
   */
  public function getContentContainerTypes(): array
  {
    return [User::class];
  }

  /**
   * @inheritdoc
   * @return GameConfig
   */
  public function getGameConfig()
  {
    return [
      'title'       => 'Flappy Bird',
      'description' => 'The Game Flappy Bird'
    ];
  }
}
