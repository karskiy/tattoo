<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('understrap_container_type');

?>

    <div class="wrapper" id="page-wrapper">

        <!-- Promo -->
        <?php get_template_part('template-parts/content', 'promo'); ?>

        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <?php get_template_part('template-parts/content', 'promo'); ?>
                </div>
                <div class="carousel-item">
                    <?php get_template_part('template-parts/content', 'promo'); ?>
                </div>
                <div class="carousel-item">
                    <?php get_template_part('template-parts/content', 'promo'); ?>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="<?php echo esc_attr($container); ?>" id="content" tabindex="-1">

            <div class="row">

                <!-- Do the left sidebar check -->
                <?php get_template_part('global-templates/left-sidebar-check'); ?>


                <main class="site-main" id="main">

                    <div class="row">
                        <!-- Page About me -->
                        <div class="col-5">
                            <?php echo get_the_post_thumbnail(29, 'full', array('class' => 'alignleft')); ?>
                        </div>
                        <div class="col-6 offset-1">
                            <?php
                            echo '<h2>' . get_post_field('post_title', 29) . '</h2>';
                            echo get_post_field('post_content', 29);
                            ?>
                        </div>
                    </div>

                </main><!-- #main -->

                <!-- Do the right sidebar check -->
                <?php get_template_part('global-templates/right-sidebar-check'); ?>

            </div><!-- .row -->

        </div><!-- #content -->

    </div><!-- #page-wrapper -->

<?php
get_footer();
