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

        <div id="content" tabindex="-1">

            <!-- Promo -->
            <?php get_template_part('template-parts/content', 'promo'); ?>

            <div id="about" class="container-fluid container-md">

                <div class="row">
                    <!-- Page About me -->
                    <div class="col-5">
                        <?php echo get_the_post_thumbnail(29, 'full', array('class' => 'alignleft')); ?>
                    </div>
                    <div class="col-6 col-lg-4 offset-1">
                        <?php
                        echo '<h2>' . get_post_field('post_title', 29) . '</h2>';
                        echo get_post_field('post_content', 29);
                        ?>
                        <p class="mt-4 text-center">
                            <button type="button" class="btn btn-outline-light rounded-0" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Написать мастеру
                            </button>
                        </p>
                    </div>
                </div>

            </div><!-- #about -->



            <!-- СВОБОДНЫЕ ЭСКИЗЫ -->
            <div id="sketch" class="container-fluid container-md">
                <?php echo '<h2>' . get_post_field('post_title', 69) . '</h2>'; ?>
            </div>

            <div id="sketchСarousel" class="carousel slide" data-bs-ride="carousel">
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
                <button class="carousel-control-prev" type="button" data-bs-target="#sketchСarousel"
                        data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#sketchСarousel"
                        data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <!-- #sketch -->


            <!-- ПОРТФОЛИО -->
            <div id="portfolio" class="container-fluid container-md">
                <?php echo '<h2>' . get_post_field('post_title', 71) . '</h2>'; ?>
            </div>


        </div><!-- #content -->

    </div><!-- #page-wrapper -->


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <?php echo do_shortcode('[contact-form-7 id="41" title="Контактная форма 1"]'); ?>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
<?php
get_footer();
